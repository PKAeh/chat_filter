const URL = "https://randomuser.me/api/?results=24";

const createItem = (list) => {
  const temProfile = document.querySelector("#profile-item");
  const listChat = document.querySelector(".lists-chat");

  listChat.innerHTML = "";
  for (const profile of list) {
    const item = temProfile.content.firstElementChild.cloneNode(true);
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

    item.addEventListener("click", () => {
      const detail = document.querySelector(".detail");
      const temDetail = document.querySelector("#detail-profile");

      const itemDetailProfile =
        temDetail.content.firstElementChild.cloneNode(true);

      const profileDetailPicture = itemDetailProfile.querySelector(
        ".detail-profile>img"
      );
      const profileDetailName = itemDetailProfile.querySelector(
        ".detail-profile-name"
      );
      const profileDetailGender = itemDetailProfile.querySelector(
        ".detail-profile-gender"
      );
      const profileDetailEmail = itemDetailProfile.querySelector(
        ".detail-profile-email"
      );
      const profileDetailTel = itemDetailProfile.querySelector(
        ".detail-profile-tel"
      );
      const profileDetailLocation = itemDetailProfile.querySelector(
        ".detail-profile-location"
      );

      detail.innerHTML = "";

      profileDetailPicture.src = profile.picture.large;
      profileDetailName.innerText = fullName;
      profileDetailGender.innerText = `Gender: ${profile.gender}, Age: ${profile.dob.age}`;
      profileDetailEmail.innerText = `Email: ${profile.email}`;
      profileDetailTel.innerText = profile.phone;
      profileDetailLocation.innerText = `${profile.location.city}, ${profile.location.country}`;

      detail.append(itemDetailProfile);
    });
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
      return fullName.includes(value.replace(" ", "").trim().toLowerCase());
    });

    createItem(showFilter);
  });
}
