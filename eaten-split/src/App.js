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
    setSelecetFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriens((friends) =>
      friends.map((friend) =>
        friend.id === selectFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelecetFriend(null);
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

      {selectFriend && (
        <FormSplitBill
          selectFriend={selectFriend}
          onHandleSplit={handleSplitBill}
        />
      )}
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
  const isSelected = selectFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormSplitBill({ selectFriend, onHandleSplit }) {
  const [bill, setBill] = useState("");
  const [payedByUser, setPayedByUser] = useState("");
  const payedByFriend = bill ? bill - payedByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function submit(e) {
    e.preventDefault();

    if (!bill || !payedByUser) return;
    onHandleSplit(whoIsPaying === "user" ? payedByFriend : -payedByUser);
  }
  return (
    <div className="split">
      <h2 className="title">Split a bill with {selectFriend.name}</h2>
      <form className="formsplit" onSubmit={submit}>
        <div className="data">
          <label>Bill value</label>
          <input
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          ></input>
        </div>

        <div className="data">
          <label>your expense</label>
          <input
            type="text"
            value={payedByUser}
            onChange={(e) =>
              setPayedByUser(
                Number(e.target.value) > bill
                  ? payedByUser
                  : Number(e.target.value)
              )
            }
          ></input>
        </div>

        <div className="data">
          <label>{selectFriend.name} expense</label>
          <input type="text" value={payedByFriend} disabled></input>
        </div>

        <div className="data">
          <label>who is paying the bill?</label>
          <select
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user">You</option>
            <option value="friend">{selectFriend.name}</option>
          </select>
        </div>

        <Button>Split bill</Button>
      </form>
    </div>
  );
}
