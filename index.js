// Import ThoughtSpot SDK
import './style.css';
import {
  init,
  RuntimeFilterOp,
  EmbedEvent,
  AuthType,
  HostEvent,
  LiveboardEmbed,
  RuntimeFilterOp,
} from '@thoughtspot/visual-embed-sdk';

import { updateFilterDisplay } from './filter-utils';

// Runtime filters array is maintained by the host app
// It drives the filter panel and feeds into the embed
const runtimeFilters = [];
const LIVEBOARD_ID = 'd084c256-e284-4fc4-b80c-111cb606449a';

// Initialize embed configuration
init({
  thoughtSpotHost: 'https://860-ap-se2-890.thoughtspotstaging.cloud/',
  authType: AuthType.None,
});

const embed = new LiveboardEmbed('#embed', {
  liveboardId: LIVEBOARD_ID,
  liveboardV2: true,
});

embed.on(EmbedEvent.VizPointClick, (payload) => {
  const selectedAttribute = payload.data.clickedPoint?.selectedAttributes[0];
  if (selectedAttribute) {
    runtimeFilters.push({
      columnName: selectedAttribute.column.name,
      operator: RuntimeFilterOp.EQ,
      values: [selectedAttribute.value],
    });
    // Fire host event to update embed
    embed.trigger(HostEvent.UpdateRuntimeFilters, runtimeFilters);
    // Update Filter UI
    updateFilterDisplay(runtimeFilters);
  }
});

embed.render();

window.removeFilter = function (ele) {
  const index = ele.closest('.filter-pill-heading').dataset.index;
  // Fire host event to update embed
  runtimeFilters[index].values = [];
  embed.trigger(HostEvent.UpdateRuntimeFilters, runtimeFilters);

  runtimeFilters.splice(index, 1);
  // Update Filter UI
  updateFilterDisplay(runtimeFilters);
};
