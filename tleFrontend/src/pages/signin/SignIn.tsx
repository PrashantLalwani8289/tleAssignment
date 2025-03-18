
import { Link, useNavigate } from "react-router-dom"
// import "./css/signin.css"
import signinImg from "./images/signin-image.jpg"
import { ROUTES } from "../../constants/routes"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { IUserSignInSchema } from "../../interface/userInterface"
import { signInSchema } from "../../validation/userValidation"
import { LoginUser } from "../../services/userServices"
import { setUser } from "../../State Management/Actions/rootReducer"
import { useDispatch } from "react-redux"

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserSignInSchema>({
		mode: "onChange",
		resolver: yupResolver(signInSchema())
	});

    const handleClick = async(data : IUserSignInSchema) => {
        const response = await LoginUser(data);
        if(response.success && response.data){
            navigate(ROUTES.CONTESTS)
            dispatch(setUser(response.data.user))
        }
        else{
            alert(response.message)
        }
    }

    return (

        <div className="main">
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={signinImg} onClick={() => navigate(ROUTES.SIGN_UP)} style={{cursor:"pointer",color:"blue"}} alt="sing up image" />
                            </figure>
                            <Link to={ROUTES.SIGN_UP} className="signup-image-link">
                                Create an account
                            </Link>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Log In</h2>
                            <form onSubmit={handleSubmit(handleClick)} className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-account material-icons-name" />
                                    </label>
                                    <Controller
                                        control={control}
                                        name="email"
                                        rules={{ required: true }}
                                        render={({ field }) => (<input {...field} type="email" name="email" placeholder="Your email" id="email"/>)}
                                    />
                                    {/* <input
                                        type="text"
                                        name="your_name"
                                        id="your_name"
                                        placeholder="Your Name"
                                    /> */}
                                    {errors.email && <span>{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock" />
                                    </label>
                                    
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{ required: true, minLength: 8 }}
                                        render={({ field }) => (<input {...field} type="password" name="password" placeholder="Password" id="password"/>)}/>
                                    {/* <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Password"
                                    /> */}
                                    {errors.password && <span>{errors.password.message}</span>}
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        value="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        defaultValue="Log in"
                                    />
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default SignUp