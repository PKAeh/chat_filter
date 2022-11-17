const URL = "https://randomuser.me/api/?results=24";

const createItem = (list) => {
  const temProfile = document.querySelector("#profile-item");
  const listChat = document.querySelector(".lists-chat");

  listChat.innerHTML = "";
  for (const profile of list) {
    const item = temProfile.content.cloneNode(true);
    const profilePicture = item.querySelector(".picture>img");
    const profileName = item.querySelector(".profile-name");
    const profileEmail = item.querySelector(".profile-email");

    const titleName = profile.name.title;
    const name = profile.name.first;
    const lastName = profile.name.last;
    const fullName = `${titleName}.${name} ${lastName}`;

    profilePicture.src = profile.picture.thumbnail;
    profileName.innerText = fullName;
    profileEmail.innerText = profile.email;

    listChat.append(item);
  }
};

async function onLoad() {
  const search = document.getElementById("search");

  const {
    data: { results },
  } = await axios.get(URL);

  createItem(results);

  search.addEventListener("input", (event) => {
    const value = event.target.value;
    // console.log(event.target.value);
    const showFilter = results.filter((profile) => {
      const titleName = profile.name.title;
      const name = profile.name.first;
      const lastName = profile.name.last;
      const fullName = `${titleName}.${name}${lastName}`.toLowerCase().trim();

      console.log(fullName);
      return fullName.includes(value.replace(" ", "").trim().toLowerCase());
    });

    createItem(showFilter);
  });
}
