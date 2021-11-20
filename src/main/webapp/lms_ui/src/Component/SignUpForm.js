// import React from "react";
//
// import PasswordStr from "./PasswordStr";
//
// const SignUpForm = ({
//                         history,
//                         onSubmit,
//                         onChange,
//                         errors,
//                         user,
//                         score,
//                         btnTxt,
//                         type,
//                         pwMask,
//                         onPwChange
//                     }) => {
//     return (
//         <div className="loginBox">
//             <h1>Sign Up</h1>
//             {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
//
//             <form onSubmit={onSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     floatingLabelText="user name"
//                     value={user.username}
//                     onChange={onChange}
//                     errorText={errors.username}
//                 />
//                 <TextField
//                     name="email"
//                     floatingLabelText="email"
//                     value={user.email}
//                     onChange={onChange}
//                     errorText={errors.email}
//                 />
//                 <TextField
//                     type={type}
//                     name="password"
//                     floatingLabelText="password"
//                     value={user.password}
//                     onChange={onPwChange}
//                     errorText={errors.password}
//                 />
//
//                 <div className="pwStrRow">
//                     {score >= 1 && (
//                         <div>
//                             <PasswordStr score={score} />
//                             <Button
//                                 className="pwShowHideBtn"
//                                 label={btnTxt} onClick={pwMask}
//                                 style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}
//                             />
//                         </div>
//                     )}
//                 </div>
//                 <TextField
//                     type={type}
//                     name="pwconfirm"
//                     floatingLabelText="confirm password"
//                     value={user.pwconfirm}
//                     onChange={onChange}
//                     errorText={errors.pwconfirm}
//                 />
//                 <br />
//                 <Button
//                     className="signUpSubmit"
//                     primary={true}
//                     type="submit"
//                     label="submit"
//                 />
//             </form>
//             <p>
//                 Already have an account? <br />
//                 <a href="/">Log in here</a>
//             </p>
//         </div>
//     );
// };
//
// export default SignUpForm;