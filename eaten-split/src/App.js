import { useState } from "react";

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
  const [friends, setFriens] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectFriend, setSelecetFriend] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriens((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelected(friend) {
    setSelecetFriend(friend);
  }
  return (
    <div className="body">
      <div className="container">
        <Friends
          friends={friends}
          onSelect={handleSelected}
          selectFriend={selectFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectFriend && <FormSplitBill />}
    </div>
  );
}

function Friends({ friends, onSelect, selectFriend }) {
  return (
    <div className="sideBar">
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.name}
            onSelect={onSelect}
            selectFriend={selectFriend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelect, selectFriend }) {
  return (
    <li>
      <img src={selectFriend.image} alt={selectFriend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {selectFriend.name} {Math.abs(selectFriend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {selectFriend.name} owes you {selectFriend.balance}
        </p>
      )}

      {selectFriend.balance === 0 && (
        <p>you and {selectFriend.name} are evenly</p>
      )}

      <Button onClick={() => onSelect(friend)}>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();

    if (!name || !image) return null;
    let id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <div>
      <form className="formStyle" onSubmit={(e) => handleAddFriend(e)}>
        <div className="data">
          <label>friend name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="data">
          <label>image url</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
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
