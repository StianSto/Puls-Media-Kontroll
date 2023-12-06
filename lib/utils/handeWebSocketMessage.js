import store from "../store";
import { setPresentationCurrent } from "../store/slices/presentationCurrentSlice";
import { setPresentationSlideIndex } from "../store/slices/presentationSlideIndexSlice";
import { setLibrary } from "../store/slices/librarySlice";

export default function handleWebsocketMessage(message) {
  if (!message) return;

  switch (message.action) {
    case actions_sub.presentationCurrent:
      let slides = flattenedSlides(message.presentation);
      store.dispatch(setPresentationCurrent(slides));
      break;

    case actions_sub.presentationSlideIndex:
      store.dispatch(setPresentationSlideIndex(message.slideIndex));
      break;

    case actions_sub.presentationTriggerIndex:
      store.dispatch(setPresentationSlideIndex(message.slideIndex));
      break;

    case actions_sub.libraryRequest:
      store.dispatch(setLibrary(message.library));
      break;

    default:
      // console.log("any message", message);
      break;
  }
}

function flattenedSlides(data) {
  const flattenedSlides = data.presentationSlideGroups.flatMap((group) =>
    group.groupSlides.map((slide) => ({
      ...slide,
    }))
  );

  flattenedSlides.map((slide, index) => {
    slide.slideIndex = index;
  });

  return flattenedSlides;
}

// https://jeffmikels.github.io/ProPresenter-API/Pro7/#operation-subscribe-/remote
const actions_sub = {
  authenticate: "authenticate",
  libraryRequest: "libraryRequest",
  playlistRequestAll: "playlistRequestAll",
  presentationCurrent: "presentationCurrent",
  presentationSlideIndex: "presentationSlideIndex",
  presentationTriggerIndex: "presentationTriggerIndex",
};
