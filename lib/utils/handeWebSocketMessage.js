import { setPresentationCurrent } from "../store/slices/presentationCurrentSlice";
import store from "../store";
import { setPresentationSlideIndex } from "../store/slices/presentationSlideIndexSlice";

export default function handleWebsocketMessage(message) {
  if (!message) return;

  switch (message.action) {
    case actions_sub.presentationCurrent:
      let slides = flattenedSlides(message.presentation);
      store.dispatch(setPresentationCurrent(slides));

    case actions_sub.presentationSlideIndex:
      console.log(message);

      store.dispatch(setPresentationSlideIndex(message.slideIndex));

    case actions_sub.presentationTriggerIndex:
      console.log(message.slideIndex);

      store.dispatch(setPresentationSlideIndex(message.slideIndex));

    default:
      console.log(message);
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
