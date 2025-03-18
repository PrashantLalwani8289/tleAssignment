import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../State Management/Store/Store";
import { GetCodeforcesContests, GetPcdLinks } from "../../services/codeForces";
import { GetLeetcodeContests } from "../../services/leetcode";
import { GetCodechefContests } from "../../services/codechef";
import { toastMessageError } from "../../components/utilities/commonToast/CommonToastMessage";
import { ROUTES } from "../../constants/routes";
import { UnifiedContest } from "../../interface/commonInterfaces";
import DarkThemeButton from "../../components/dark-theme-button";

const Contests: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.root.isAuthenticated);
  const [contests, setContests] = useState<UnifiedContest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Codeforces",
    "LeetCode",
    "CodeChef",
  ]);
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarkedContests");
    if (storedBookmarks) {
      setBookmarkedContests(JSON.parse(storedBookmarks));
    }
  }, []);

  const toggleBookmark = (contestId: string) => {
    let updatedBookmarks = [...bookmarkedContests];

    if (updatedBookmarks.includes(contestId)) {
      updatedBookmarks = updatedBookmarks.filter((id) => id !== contestId);
    } else {
      updatedBookmarks.push(contestId);
    }

    setBookmarkedContests(updatedBookmarks);
    localStorage.setItem("bookmarkedContests", JSON.stringify(updatedBookmarks));
  };


  const get_contests = async () => {
    setLoading(true);
    const response = await GetPcdLinks()
    let contestLinksObj: { [key: string]: string } = {}
    if(response.success && response.data) {
      const contestLinks = response.data
      console.log(contestLinks, "links");
    contestLinksObj = contestLinks.reduce((acc: { [key: string]: string }, link: { contest_id: string, url: string }) => {
      acc[link.contest_id] = link.url;
      return acc;
    }, {});
    }
    console.log(contestLinksObj, "here")
    const codechefResponse = await GetCodechefContests();
    const codechefContests: UnifiedContest[] = codechefResponse?.data?.map((contest: any) => ({
      id: contest.contest_code,
      title: contest.contest_name,
      startTimeSeconds: new Date(contest.contest_start_date_iso).getTime() / 1000,
      platform: "CodeChef",
      pcdLink: contestLinksObj[contest.contest_code] ? contestLinksObj[contest.contest_code] : "Not Present",
      status:
        new Date(contest.contest_start_date_iso).getTime() / 1000 > Math.floor(Date.now() / 1000)
          ? "Available for Registration"
          : "Not Available",
    })) || [];

    const leetcodeResponse = await GetLeetcodeContests();
    const leetcodeContests: UnifiedContest[] = leetcodeResponse?.data?.map((contest: any) => ({
      title: contest.title,
      titleSlug: contest.titleSlug,
      startTimeSeconds: contest.startTime,
      platform: "LeetCode",
      pcdLink: contestLinksObj[contest.titleSlug] ? contestLinksObj[contest.titleSlug] : "Not Present",
      status:
        contest.startTime > Math.floor(Date.now() / 1000)
          ? "Available for Registration"
          : "Not Available",
    })) || [];

    const codeforcesResponse = await GetCodeforcesContests();
    const codeforcesContests: UnifiedContest[] = codeforcesResponse?.data?.result?.map((contest: any) => ({
      id: contest.id,
      title: contest.name,
      startTimeSeconds: contest.startTimeSeconds,
      platform: "Codeforces",
      pcdLink: contestLinksObj[contest.id] ? contestLinksObj[contest.id] : "Not Present",
      status:
        contest.startTimeSeconds > Math.floor(Date.now() / 1000)
          ? "Available for Registration"
          : "Not Available",
    })) || [];

    const mergedContests = [...leetcodeContests, ...codeforcesContests, ...codechefContests].sort(
      (a, b) => (b.startTimeSeconds! - a.startTimeSeconds!)
    );

    if (mergedContests.length > 0) {
      setContests(mergedContests);
    } else {
      toastMessageError("No contests found.");
    }

    setLoading(false);
  };

  useEffect(() => {
    get_contests();
  }, []);

  const calculateTimeLeft = (startTimeSeconds?: number) => {
    if (!startTimeSeconds) return "N/A";

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeftVal = startTimeSeconds - currentTime;

    if (timeLeftVal <= 0) return "-";

    const days = Math.floor(timeLeftVal / (60 * 60 * 24));
    const hours = Math.floor((timeLeftVal % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeftVal % (60 * 60)) / 60);
    const seconds = timeLeftVal % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(
        contests.reduce((acc, contest) => {
          acc[contest.id || contest.startTimeSeconds!] = calculateTimeLeft(contest.startTimeSeconds);
          return acc;
        }, {} as { [key: number]: string })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [contests]);

  const filteredContests = contests.filter((contest) => selectedPlatforms.includes(contest.platform));

  const handlePlatformChange = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleSelectAll = () => {
    setSelectedPlatforms(["Codeforces", "LeetCode", "CodeChef"]);
  };

  const handleClearAll = () => {
    setSelectedPlatforms([]);
  };

  return (
    <div className="main">
      <div className="main-wrapper">
        <div className="main-wrapper-inner">
          <div className="wrapper-pages">
            <div className="container-fluid">
              <div className="white-card p-0">
                <div className="card-header">
                  <div className="row align-items-center mb-4 g-3">
                    <div className="col-md-6">
                      <h2>Contests</h2>
                    </div>
                    <div className="col-md-6 text-end">
                      {/* Filter checkboxes */}
                      <div className="d-flex align-items-center justify-content-end gap-3">
                        <div>
                          <label className="me-2">
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes("Codeforces")}
                              onChange={() => handlePlatformChange("Codeforces")}
                            />
                            Codeforces
                          </label>
                        </div>
                        <div>
                          <label className="me-2">
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes("LeetCode")}
                              onChange={() => handlePlatformChange("LeetCode")}
                            />
                            LeetCode
                          </label>
                        </div>
                        <div>
                          <label className="me-2">
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes("CodeChef")}
                              onChange={() => handlePlatformChange("CodeChef")}
                            />
                            CodeChef
                          </label>
                        </div>
                        <div className="ms-3">
                          <button className="btn btn-sm btn-outline-primary me-1" onClick={handleSelectAll}>
                            All
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" onClick={handleClearAll}>
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DarkThemeButton/>
                <div className="theme-table" id="scrollableOrganizationListDiv">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Platform</th>
                        <th>Status</th>
                        <th>Date &amp; Time</th>
                        <th>Time Left</th>
                        <th>PCD Link</th>
                        <th>Bookmark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContests.length > 0 ? (
                        filteredContests.map((contest: UnifiedContest, index: number) => (
                          <tr key={index}>
                            <td>
                              {contest.platform === "Codeforces" ? (
                                <a href={`https://codeforces.com/contest/${contest.id}`} target="_blank" rel="noopener noreferrer">
                                  {contest.title.length > 40 ? contest.title.substring(0, 40) + "..." : contest.title}
                                </a>
                              ) : contest.platform === "LeetCode" ? (
                                <a href={`https://leetcode.com/contest/${contest.titleSlug}`} target="_blank" rel="noopener noreferrer">
                                  {contest.title.length > 40 ? contest.title.substring(0, 40) + "..." : contest.title}

                                </a>
                              ) : (
                                <a href={`https://www.codechef.com/${contest.id}`} target="_blank" rel="noopener noreferrer">
                                  {contest.title.length > 40 ? contest.title.substring(0, 40) + "..." : contest.title}

                                </a>
                              )}
                            </td>
                            <td>{contest.platform}</td>
                            <td>
                              <span className={`badge ${contest.status !== "Not Available" ? "bg-success" : "bg-warning"}`}>
                                {contest.status}
                              </span>
                            </td>
                            <td>{new Date(contest.startTimeSeconds! * 1000).toLocaleString()}</td>
                            <td>{timeLeft[contest.id || contest.startTimeSeconds!] || "Calculating..."}</td>
                            {contest.pcdLink !== "Not Present" &&<td><a href={contest.pcdLink}>Youtube</a></td>}
                            {contest.pcdLink === "Not Present" &&<td>{contest.pcdLink}</td>}
                            <td>{isAuthenticated ? <input onClick={() => toggleBookmark(contest.id as unknown as string ?? contest.titleSlug as string)} type="checkbox" checked={ bookmarkedContests.includes(contest.id as unknown as string ?? contest.titleSlug as string) ? true:false }/> : <Link to={ROUTES.SIGN_IN}>Log in to Bookmark</Link>}</td>
                          </tr>
                        ))
                      ) : loading ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center">
                            <b>No contests found</b>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;
