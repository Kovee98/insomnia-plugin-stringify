# insomnia-plugin-stringify
## Overview
This plugin is a simple stringifier built because of Firebase's restrictions on data messages. Any key in the json body that contains `.stringify` will be stringified before being sent on. `.stringify` is not kept in the key name in the final json body.

## Install
### One-Click installation
1.  Go to [http://insomnia.rest/plugins/insomnia-plugin-stringify](http://insomnia.rest/plugins/insomnia-plugin-stringify)
2.  Click the **"Install plugin"** button.
3.  Click **"Open Insomnia"** and **"Install"**

### Install from plugins tab
1.  Open Insomnia
2.  Go to Application > Preferences > Plugins
3.  Enter `insomnia-plugin-stringify`
4.  Click **"Install Plugin"**

## Usage
With the plugin installed and enabled, just add `.stringify` to the end of any key whose value you'd like to stringify.

Ex:
```json
{
    "person":{
        "id": "1234456",
        "data": {
            "name": "joe",
            "job": "doctor",
            "age": 25,
            "payload.stringify": {
                "hello": "world",
                "insomnia": "plugin",
                "number": 1
            }
        }
    }
}
```

gets turned into
```json
{
    "person":{
        "id": "1234456",
        "data": {
            "name": "joe",
            "job": "doctor",
            "age": 25,
            "payload": "{\"hello\":\"world\",\"insomnia\":\"plugin\",\"number\":1}"
        }
    }
}
```

Note: `.stringify` is not kept in the key after stringification.