interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const Profile: React.FC<IProps> = (props) => {
  return <div {...props}>个人介绍</div>;
};

export default Profile;
