import classes from "./ProfilePage.module.css";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  return (
    <section className={classes.profilePageContainer}>
      <h1 className={classes.title}>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default ProfilePage;
