// let store = {
//   user: { name: "Student" },
//   apod: "",
//   rovers: ["Curiosity", "Opportunity", "Spirit"],
//   selectedRover: "Curiosity",
//   eventHandlers: [],
// };

let store = Immutable.Map({
  rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
  selectedRover: "Curiosity",
  eventHandlers: Immutable.List([]),
});

// --- Workaround to add eventhandlers to components --------------------------

const randomId = () => "id-" + Math.random().toString(36).slice(3);

const addEventHandler = (id, event, handler) => {
  store = store.merge({
    eventHandlers: store.get("eventHandlers").push({ id, event, handler }),
  });
};
const clearEventHandlers = () => {
  store = store.merge({ eventHandlers: Immutable.List([]) });
};

const setEventHandlers = () => {
  store.get("eventHandlers").forEach(({ id, event, handler }) => {
    document.getElementById(id).addEventListener(event, handler);
  });
  clearEventHandlers();
};

// ----------------------------------------------------------------------------

// Add our markup to the page
const root = document.getElementById("root");

const updateStore = (newState) => {
  store = store.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
  setEventHandlers();
};

// Code below will explicitly trigger rendering of the DOM on events.
const rerender = () => render(root, store);

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
  getImages();
});

// ---  COMPONENTS ------------------------------------------------------------

// Create content
const App = (state) => {
  return `
    ${Menu()}
    ${Images(store.get("selectedRover"))}
  `;
};

const Button = (style = "") => ({ label, active, action }) => {
  const id = randomId();
  const button = `
        <button
            id="${id}" 
            class="${style}${active ? " active" : ""}"
        >
            ${label}
        </button>
    `;
  addEventHandler(id, "click", action);
  return button;
};

const StyledButton = Button("btn")

const Menu = () => {
  const menu = `
        <div class="menu">
            ${store
              .get("rovers")
              .map((rover) =>
                StyledButton({
                  label: rover,
                  active: store.get("selectedRover") === rover,
                  action: () => roverSelectionAction(rover),
                })
              )
              .join("")}
          </div>`;
  return menu;
};

const roverSelectionAction = (rover) => {
  store = store.set("selectedRover", rover);
  rerender();
};

const Images = (rover) => {
  if (!store.get("images")) {
    return `<h1>Loading... </h1>`;
  }

  const error = store.getIn(["images", "error"])
  if (error) {
    return `
      <h1>Error</h1>
      <p>${error}</p>
    `
  }

  const roverInfo = store.getIn(["images", rover.toLowerCase()]);
  return `
    <div class="image-gallery">
        ${RoverInfo(roverInfo)}
        ${roverInfo
          .get("photos")
          .map((src) => StyledImage({ src }))
          .join("")}
    </div>
    `;
};

const Image = (style = "") => ({ src }) => {
  return `
        <img class="${style}" src="${src}" />
    `;
};

const StyledImage = Image("image-box")

const RoverInfo = (info) => {
  return `
        <div class="image-box">
            <p><span class="label">Status:</span> ${info.get("status")}</p>
            <p><span class="label">Launch:</span> ${info.get("launch_date")}</p>
            <p><span class="label">Landing:</span> ${info.get(
              "landing_date"
            )}</p>
            <p><span class="label">Photo:</span> ${info.get("photo_date")}</p>
        </div>
    `;
};

// --- API CALL. Explicitly rerender DOM once images have been loaded ---------

const getImages = () => {
  fetch("http://localhost:3000/rovers")
    .then((res) => res.json())
    .then((images) => updateStore({ images }))
    .then(() => rerender());
};
