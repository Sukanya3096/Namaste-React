class User extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/sukanyadutta3096");
    const response = await data.json();

    console.log(response)
  }
  render() {
    return (
      <div>
        <h1>User</h1>
      </div>
    );
  }
}
