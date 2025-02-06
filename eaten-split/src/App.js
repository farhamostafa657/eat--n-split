const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="body">
      <div className="container">
        <Friends />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function Friends() {
  const friends = initialFriends;
  return (
    <div className="sideBar">
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.name} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}
        </p>
      )}

      {friend.balance === 0 && <p>you and {friend.name} are evenly</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="btn">{children}</button>;
}

function FormAddFriend() {
  return (
    <div>
      <form className="formStyle">
        <div className="data">
          <label>friend name</label>
          <input type="text"></input>
        </div>

        <div className="data">
          <label>image url</label>
          <input type="text"></input>
        </div>
        <Button>Add</Button>
      </form>
    </div>
  );
}

function FormSplitBill() {
  return (
    <div className="split">
      <h2 className="title">Split a bill with x</h2>
      <form className="formsplit">
        <div className="data">
          <label>Bill value</label>
          <input type="text"></input>
        </div>

        <div className="data">
          <label>your expense</label>
          <input type="text"></input>
        </div>

        <div className="data">
          <label>X expense</label>
          <input type="text"></input>
        </div>

        <div className="data">
          <label>who is paying the bill?</label>
          <select>
            <option value="user">You</option>
            <option value="friend">x</option>
          </select>
        </div>

        <Button>Split bill</Button>
      </form>
    </div>
  );
}
