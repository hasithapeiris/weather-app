import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { TextField } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <TextField
              type="text"
              label="Name"
              id="name"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={onChange}
              fullWidth
            />
          </div>

          <div className={styles.formGroup}>
            <TextField
              type="email"
              label="Email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              fullWidth
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              type="password"
              label="Password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              fullWidth
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              type="password"
              label="Confirm Password"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              fullWidth
            />
          </div>

          <div className={styles.formGroup}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
