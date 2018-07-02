const light = require("hyper-one-light");
const dark = require("hyperterm-atom-dark");

function isDayTime(config) {
  // read in config
  const dayNightConfig = Object.assign(
    {
      sunUp: 6,
      sunDown: 21
    }, config.dayNightSwitch
  );

  var date = new Date();
  var hour = date.getHours();

  return hour > dayNightConfig.sunUp && hour < dayNightConfig.sunDown;
}

exports.decorateConfig = config => {

  if (isDayTime(config)) {
    return light.decorateConfig(config);
  }
  return dark.decorateConfig(config);
};

var middlewareTick = 0;
exports.middleware = store => next => action => {
  middlewareTick += 1;
  if (middlewareTick > 100) {
    middlewareTick = 0;
    store.dispatch({
      type: "UPDATE_THEME",
      config: config.getConfig()
    });
  }
  next(action);
};

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case "UPDATE_THEME":
      var theme;
      if (isDayTime(config)) {
        theme = light.decorateConfig(action.config);
      } else {
        theme = dark.decorateConfig(action.config);
      }

      return state
        .set("foregroundColor", theme.foregroundColor)
        .set("backgroundColor", theme.backgroundColor)
        .set("borderColor", theme.borderColor)
        .set("cursorColor", theme.cursorColor)
        .set("colors", theme.colors)
        .set("termCSS", `${config.termCSS || ""} ${theme.termCSS}`)
        .set("css", `${config.css || ""} ${theme.css}`);
  }
  return state;
};
