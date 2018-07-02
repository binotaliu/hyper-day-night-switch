# Description

This plugin will set your terminal to use the Atom One Light theme in the day and Atom One Dark theme at night.

# Install

Edit ~/.hyper.js and include the plugin name:

```
module.exports = {
    config: {
        plugins: ['hyper-day-night-switch'],
    }
}
```

# Config

```
module.exports = {
    config: {
        dayNightSwitch: {
            sunUp: 6,
            sunDown: 21
        },
    }
}
```

# Themes

These are the themes this plugin will use:

```
hyper-one-light
hyperterm-atom-dark
```
