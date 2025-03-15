
import { useNavigate } from "react-router-dom"
// import "./css/signup.css"
import signinImg from "./images/signin-image.jpg"
import { ROUTES } from "../../constants/routes"
import { Controller, useForm } from "react-hook-form"
import { IUserSignUpSchema } from "../../interface/userInterface"
import { signUpSchema } from "../../validation/userValidation"
import { yupResolver } from "@hookform/resolvers/yup"
import { SignUpUser } from "../../services/userServices"
import { useDispatch } from "react-redux"
import { setUser } from "../../State Management/Actions/rootReducer"





const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserSignUpSchema>({
		mode: "onChange",
		resolver: yupResolver(signUpSchema())
	});

    const handleClick = async(data : IUserSignUpSchema) => {
        const response = await SignUpUser(data);
        if(response.success && response.data){
            navigate(ROUTES.CONTESTS)
            console.log(response)
            dispatch(setUser(response.data.user))
        }
        else{
            alert(response.message)
        }
    }

    return (

        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            {/* <Form onSubmit=handleSubmit(handleClick)> */}

                            <form onSubmit={handleSubmit(handleClick)} className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="full_name">
                                        <i className="zmdi zmdi-account material-icons-name" />
                                    </label>
                                    <Controller
                                        name="full_name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Your Name"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.full_name && <span>{errors.full_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email" />
                                    </label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Your Email"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.email && <span>{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">
                                        <i className="zmdi zmdi-lock" />
                                    </label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="password"
                                                id="pass"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass">
                                        <i className="zmdi zmdi-lock-outline" />
                                    </label>
                                    <Controller
                                        name="confirm_password"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="password"
                                                id="re_pass"
                                                placeholder="Repeat your password"
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signup"
                                        id="signup"
                                        className="form-submit"
                                        value="Register"
                                    />
                                </div>
                            </form>
                            {/* </Form> */}
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src={signinImg} alt="sing up image" />
                            </figure>
                            <a onClick={() => navigate(ROUTES.SIGN_IN)} style={{cursor:"pointer",color:"blue"}} className="signup-image-link">
                                I am already member
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default SignUp

