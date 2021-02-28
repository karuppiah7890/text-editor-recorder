# Story

I missed to write a story while starting this project. It has been dormant till
now. I'm picking it up again now.

I realized I could capture the details in some form of text like a history of
stuff. What I was trying to solve and stuff.

I see I have been using Ace from https://cdnjs.cloudflare.com/ URL. It's closely
working with CDN.JS https://cdnjs.com/

The ace library is present here

https://cdnjs.com/libraries/ace/

Latest version as of now is 1.4.12

CDN.JS seems to have a lot of libraries.

https://cdnjs.com/libraries

---

Back to Ace.

https://ace.c9.io/

I seem to have read some stuff and written some code. I forgot most of it now.
😅 I need to read it again. Anyways. Let's see how readable the code is.

https://ace.c9.io/#nav=embedding

There are other CDNs it seems.

https://pagecdn.com/lib/ace

http://www.jsdelivr.com/#!ace or https://www.jsdelivr.com/package/npm/ace

Packaged version - https://github.com/ajaxorg/ace-builds/

I guess I could read this how to guide to start off

https://ace.c9.io/#nav=howto

Or just use the API reference, which is what I did initially I think

https://ace.c9.io/#nav=api

---

I think the goal of the project when I initially started out was to have a
collaborative text editor. I chose ace, but of course there are other editors
also. Ideally I should be able to plug and play collaborative text editing
feature to any editor after cracking the nitty gritties in each and some general
algorithm too :)

---

Some research on online / web based code editors

https://microsoft.github.io/monaco-editor/index.html

Monaco mentions it can't support mobile browsers hmm.

https://github.com/Microsoft/monaco-editor

---

https://github.com/icecoder/ICEcoder

https://icecoder.net/

---

https://codemirror.net/

https://ace.c9.io/

---

Write code to record what is typed by the user and replay it! :) Record in such a way that it can be replayed.

---

https://stackoverflow.com/q/47347986/4772008

https://bigl.es/tuesday-tooling-record-replay-keystrokes-with-python/amp/

https://www.tecmint.com/record-and-replay-linux-terminal-session-commands-using-script/amp/

---

The goal as of now is to use a code editor on the web, understand some basics of
it of course and use it to create something where when one user types something,
the changes are recorded, along with time. Then the recording can be replayed.
This is just a basic idea I had. This is to enable an experience where one user
can type and another user can see what the other user typed. But it won't or
might not be exactly real time experience. It will be more like near real time
experience based on an assumption of how video live broadcasting happens, but
that's something to check out! :) How online video live broadcasting and radio
live broadcasting and TV live broadcasting happens, to get some ideas and
inspiration.

Also, this kind of record and replay is not something new. Many people have done
it. I have in fact seen editor extensions do it. Online coding platforms do it,
which help people interview students on the platforms for coding rounds and the
recording of the student typing code is recorded and replayed, but not exactly
like a video, though that's also possible, in some sort of screen recording like
sense. But screen recordings will need a lot of data and would be high end. Just
recording the text that the student types is enough to play it back again.
Recording also means recording with time! That's the basic thing in recording.
The time factor. At least that's what I'm assuming. So, if the user types fast,
the replay should show that speed, and the same for typing slow or not typing at
all for sometime.

I want to try recording what a user types in ace editor. That's the goal.

As of now, the code looks like this

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>ACE in Action</title>
    <style type="text/css" media="screen">
      #editor {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    </style>
  </head>

  <body>
    <div id="editor">
      function foo(items) { var x = "Wow, this is so cool!!!"; return x; }
    </div>

    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js"
      type="text/javascript"
      charset="utf-8"
    ></script>
    <script>
      var editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/javascript");
      editor.session.on("change", function (delta) {
        console.log(delta.start, delta.end, delta.lines, delta.action);
      });
      // editor.session.selection.on('changeSelection', function (e) {
      //     console.log(e);
      // });
      // editor.session.selection.on('changeCursor', function (e) {
      //     console.log(e);
      // });
    </script>
  </body>
</html>
```

Let's see if I can understand the code.

I forgot CSS now. 🙈 But I can see there's some CSS to help with positioning the
editor element.

Editor content is put in a `div` tag.

The `script` tag loads the ace editor library, and then we have our js code
running in another `script` tag.

I'm just checking out about Ace API here

https://ace.c9.io/#nav=api

It has a nice diagram as of now.

Apparently the editor is the main entry point to the API. It holds the
VirtualRenderer and EditSession it seems. And handles the mouse and keyboard
events - user events. I'm wondering what mouse events are there. Hmm.

Edit Session: Stores state related to a document it seems. I wonder what is this
state. I do see that it keeps track of some stuff. Maybe that's the state. Makes
sense. So, it keeps track of - Selection, Cursor Position, Scroll Position,
UndoManager, Language Mode (TextMode)

Document wraps the text document it seems. It's an array of strings it seems.
Hmm. What does that mean? Like, is it like each line in the document is a string
and all lines put together are stored as array of strings? I don't know.

TextMode defines Language Specific functionality it seems. Syntax highlighting,
which is very important and also Auto indentation rules. Pretty tricky stuff is
what I usually feel when I think how it's gonna be hard to manage all this when
it's a collaborative text editor. Or maybe it's not. I mean, many have solved
it. I'm sure there must be some way to tackle it all! :)

Virtual Renderer draws everything it seems. And it has layers? Controls? I see
some stuff under Controls - Text, Cursor, Selection. Not sure what this all
means, hmm

https://ace.c9.io/#nav=api&api=ace

We used the `edit` method to embed the Ace editor into the DOM's `div` element.

We then set themes using `setTheme` method in Editor

https://ace.c9.io/#nav=api&api=editor

I'm wondering how we know what is the string to pass to set the theme, hmm

https://ace.c9.io/#nav=howto mentions about themes

https://github.com/ajaxorg/ace/tree/master/lib/ace/theme has a lot of themes.

https://github.com/ajaxorg/ace#embedding-ace has some info on themes.

I was just wondering how I came up with that path though, and that if nothing
else is needed to get the theme, like an extra resource (css, js etc)

And wow, I can also make the editor read only! With

```javascript
editor.setReadOnly(true);
```

This way, the other user cannot edit the content on the editor and can simply
see what the remote user is typing on the code editor. At least this is the
first version I plan for! :)

I can also emulate user input it seems! :)

```javascript
editor.insert("Something cool");
```

Apparently the themes are loaded on demand. It is mentioned in the how-to guide.
I really need to read all the text in the documentation. I always glance or skim
through it 🙈

> Themes are loaded on demand; all you have to do is pass the string name:

I think it is downloaded from the Internet. Let me check the Network tab to
understand that! :)

Right, so, checking my browser, I found out that I'm only using one URL in my
code to get Ace editor library

https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js

But the browser also makes calls to these URLs

https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/theme-monokai.js

https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/mode-javascript.js

https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/worker-javascript.js

Not sure what the worker does. But the mode javascript is clear - it is for the
text mode / the language mode - to highlight javascript code! :) Same for theme
monokai - for the editor theme! Makes complete sense! :)

There's some demo on autoresize

https://ace.c9.io/demo/autoresize.html

I'm yet to understand it. But it looks nice, the demo :P :)

I also see some demos in `demo` directory in ace-builds repo
https://github.com/ajaxorg/ace-builds

I'm also on GitHub checking out some other ecosystem tools and plugins or what
not, for Ace

https://github.com/search?q=ace+editor

https://github.com/search?q=ace+editor+plugin

---

Now, back to my code.

```javascript
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
```

These are straight forward. Setting theme and mode

I have some more code

```javascript
editor.session.on("change", function (delta) {
  console.log(delta.start, delta.end, delta.lines, delta.action);
});
// editor.session.selection.on('changeSelection', function (e) {
//     console.log(e);
// });
// editor.session.selection.on('changeCursor', function (e) {
//     console.log(e);
// });
```

Nice. So, I already have code to check about changes in the document. I can
already see logs in my browser console when I make changes. Hmm.

https://ace.c9.io/#nav=api&api=edit_session

I gotta check what else shows up in the delta / event data.

```javascript
{
  "start": {
    "row": 199,
    "column": 0
  },
  "end": {
    "row": 200,
    "column": 0
  },
  "action": "insert",
  "lines": [
    "",
    ""
  ],
  "id": 15
}
```

Sometimes I see the `id`, sometimes I don't. Gotta check why. But it's
interesting to see so much data. The above data is for attaching a new line.

One event data for deletion is

```javascript
{
  "start": {
    "row": 0,
    "column": 0
  },
  "end": {
    "row": 216,
    "column": 4
  },
  "action": "remove",
  "lines": [
    "",
    "function foo(items) { var x = \"Wow, this is so cool!!!\"; return x; }",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "    "
  ],
  "id": 16
}
```

I guess a message like this

```javascript
{
  "start": {
    "row": 0,
    "column": 18
  },
  "end": {
    "row": 1,
    "column": 0
  },
  "action": "insert",
  "lines": [
    "",
    ""
  ],
  "id": 22
}
```

means that we need to start inserting information / data at row 0, column 18,
and what's the data to insert? how many lines of data? In this case, we have two
lines of data to insert. First line, the row 0, column 18, after that, we don't
need to put any data, as it's an empty string. Then, we go to next line, we
need to put empty string data again, which is nothing and then stop at row 1,
column 0, which is exactly the next line only.

When I copy and paste something, it looks like this

```javascript
{
  "start": {
    "row": 2,
    "column": 0
  },
  "end": {
    "row": 3,
    "column": 0
  },
  "action": "insert",
  "lines": [
    "let something = ok",
    ""
  ],
  "id": 25
}
```

Again, it was a line and a new line.

When typing stuff like a double quote, the system automatically adds another
closing double quote. Ace also shows the change information like this

```javascript
{
  "start": {
    "row": 0,
    "column": 10
  },
  "end": {
    "row": 0,
    "column": 12
  },
  "action": "insert",
  "lines": [
    "\"\""
  ],
  "id": 37
}
```

Same for parenthesis

```javascript
{
  "start": {
    "row": 2,
    "column": 9
  },
  "end": {
    "row": 2,
    "column": 11
  },
  "action": "insert",
  "lines": [
    "()"
  ],
  "id": 41
}
```

But ace doesn't put a closing curly brace for some reason. Hmm. Anyways.

For square bracket completion

```javascript
{
  "start": {
    "row": 2,
    "column": 0
  },
  "end": {
    "row": 2,
    "column": 2
  },
  "action": "insert",
  "lines": [
    "[]"
  ],
  "id": 45
}
```

Oh, for curly brace, ace puts the closing brace when pressing enter after first
curly brace

```javascript
{
  "start": {
    "row": 2,
    "column": 16
  },
  "end": {
    "row": 4,
    "column": 1
  },
  "action": "insert",
  "lines": [
    "",
    "    ",
    "}"
  ],
  "id": 71
}
```

I just noticed there's a `changeFold` event! :O So I can know when a code is
folded or even removed apparently

```javascript
EditSession.on("changeFold", function())
// Emitted when a code fold is added or removed.
```

The code looks like this

```javascript
editor.session.on("changeFold", function (delta) {
  console.log(delta);
});
```

And the console log message with delta looks like this on folding

```json
{
  "action": "add",
  "data": {
    "collapseChildren": null,
    "end": {
      "column": 6,
      "row": 4
    },
    "foldLine": {
      "end": {
        "row": 4,
        "column": 6
      },
      "foldData": [{}],
      "folds": [],
      "range": {
        "start": {},
        "end": {}
      },
      "start": {
        "row": 1,
        "column": 27
      }
    },
    "placeholder": "...",
    "range": {
      "end": {
        "row": 4,
        "column": 6
      },
      "start": {
        "row": 1,
        "column": 27
      }
    },
    "ranges": [],
    "sameRow": false,
    "start": {
      "column": 27,
      "row": 1
    },
    "subFolds": []
  }
}
```

It has a lot of data about how to fold the code. Nice! Also, the fold data,
fold lines etc, apparently it's some cyclic structure. I couldn't copy the
object from the browser console. Damn thing.

Similar to adding a fold, there's also a thing for removing the fold, where
`action` is `remove` with similar data.

Next thing I'm going to check is about selection. I wanted to see if users can
select information and if that can be captured.

https://ace.c9.io/#nav=api&api=selection

The code I wrote is commented out currently. I'm going to uncomment it

```javascript
// editor.session.selection.on('changeSelection', function (e) {
//     console.log(e);
// });
// editor.session.selection.on('changeCursor', function (e) {
//     console.log(e);
// });
```

Since I'm getting a lot of logs for all the different events, like change,
and for cursor, I'm going to comment out others and just have cursor and
selection event code

Even with cursor and selection, there's a lot of logs. Right.

I'm choosing selection first.

Right, so I'm just getting an event object with two functions / methods and no
other data. Hmm. Weird.

```javascript
editor.session.selection.on("changeSelection", function (e) {
  console.log(e);
});
```

```javascript
{
  "preventDefault": function s(){},​
  "stopPropagation": function i(){},
  "type": "changeSelection"
}
```

I was just wondering what to do now. Hmm.

Looking at how-to

https://ace.c9.io/#nav=howto

```javascript
editor.getSelectedText(); // or for a specific range
editor.session.getTextRange(editor.getSelectionRange());

editor.selection.getCursor();

editor.gotoLine(lineNumber);

editor.session.getLength();
```

at Editor level

https://ace.c9.io/#nav=api&api=editor

```
getSelection() -> Selection

Returns selection object.

---

getSelectionRange() -> Range

Returns the Range for the selected text.

---

getSelectionStyle() -> String

Returns the current selection style.
```

But the documentation doesn't have `editor.getSelectedText();` though. Hmm.
In the list methods that is.

https://ace.c9.io/#nav=api&api=edit_session

```
getTextRange(Range range) -> String

Given a range within the document, this function returns all the text within that range as a single string.

Arguments
range:	Range - Required. The range to work with
```

But Range stuff exists

https://ace.c9.io/#nav=api&api=range

But the below worked though!! :D :D

```javascript
editor.session.selection.on("changeSelection", function (e) {
  console.log(editor.getSelectedText());
});
```

The below too worked!!

```javascript
editor.session.selection.on("changeSelection", function (e) {
  console.log(editor.getSelectedText());
  console.log(editor.getSelectionRange());
});
```

```javascript
{
  "start": {
    "row": 1,
    "column": 24
  },
  "end": {
    "row": 1,
    "column": 34
  }
}
```

It can show selection range too! :D :D :)

Next, I can see that the `changeCursor` event also doesn't give any data. We
just need to get the data from the editor with these methods

```
getCursorPosition() : Object

Gets the current position of the cursor.

---

getCursorPositionScreen(): Number

Returns the screen position of the cursor.
```

```javascript
editor.session.selection.on("changeCursor", function (e) {
  console.log(editor.getCursorPosition());
  console.log(editor.getCursorPositionScreen());
});
```

Both the values on the logs look same to me. I don't know exactly what the
screen position means. Anyways...

I think I should go back to recording what the user types! :)

---

Recording means there's usually a start. A record button.

Considering the record button as the start of a timer, it should keep going on, the timer.

Whenever user types stuff, we can note down the time and the diff or change or the user event data basically. Hopefully we get the user events immediately. Let's capture the time or timestamp immediately.

We need to have a log of such user event data. With timestamp. It's like seeing a subtitles file which shows time and then the subtitle data. Similar to that.

Now, like any other recording, there should be a stop button too. We can think about pause and resume buttons later :p

With this log, now we need to see how to play this log visually. It's gonna be hard. Like, how to run and show the log exactly based on time? Hmm? Like, when I press play button. Let's say the first user action happened after the first two seconds. How do we show it? I mean, we have to wait for two seconds and then understand that we have a data to show at the 2nd second completion or something. It's like a timer should keep going and when an instant happens in the timer we need to do or show something from our log data corresponding to that time.

How do subtitles work? Hmm

I guess we need to look at the accuracy of the log's timestamp. Like, is it at seconds, milli second, micro second, nanosecond. Check what's possible in JavaScript.

Check how to have timers.

Remember, setInterval timer doesn't work correctly. I mean, if you say run something after 5 seconds, it might take a bit more than 5 seconds to run it. It won't be accurate it seems. Check what built in timer you can use or external timer libraries! :)

---

Cool, now I know how to get all the deltas and redo / apply the deltas to the editor to show what the user was typing

Now, I'm assuming that these deltas should be in the right order. I can only verify that by writing tests. Anyways, it's kind of like commutative replicated data type. Except that in this case, I don't think that the actions might be commutative. Or I need to prove that that's the case. :) So order of deltas is important for now, till I prove it otherwise. It's safe to assume that same order of deltas will give correct results. :)

---

Applications of recording coding?

Interviews? Though I consider it a bad application.
Another is, for teaching purposes. For example Scrimba has this recording where there's a recording of the code typed out and a voice over. I think the same can be done for workshops or coding tutorials. People on low bandwidths will benefit a lot if the only thing to show is code. So, there can be audio, which is low data and then recorded code being typed out which is again low data compared to a video which will have resolutions and what not and video may not even be clear and hence text may not even be clear.
I think there are more tools with similar ideas. For example asciinema records terminal like this. There are also existing tools that record user typing. You can see it as plugins on code editors and as a feature used in coding platforms for interviews. I haven't used any other standalone tool yet. Will check it out soon! :)

Which brings me to the point - how does asciinema record terminal? How does the data stored look like? Check the timing and understand how they play the log. Also check how tools play subtitles :)

Action: check how the following happens
asciinema play of recording
subtitles play of subtitle file

---

https://duckduckgo.com/?t=ffab&q=javascript+timer&ia=web

---

asciinema file looks something like

```
{"version": 2, "width": 115, "height": 31, "timestamp": 1591686103, "env": {"SHELL": "/bin/bash", "TERM": "xterm-256color"}}
[1.994932, "o", "bash-3.2$ "]
[2.939939, "o", "t"]
[3.092102, "o", "m"]
[3.292235, "o", "u"]
[3.484334, "o", "x"]
[3.836786, "o", "\r\n"]
[5.181224, "o", "\u001b[?1049h\u001b[22;0;0t\u001b[?1h\u001b=\u001b[H\u001b[2J\u001b[?12l\u001b[?25h\u001b[?1000l\u001b[?1002l\u001b[?1006l\u001b[?1005l\u001b[?1004h\u001b[c\u001b(B\u001b[m\u001b[?12;25h\u001b[?12l\u001b[?25h\u001b[?1003l\u001b[?1006l\u001b[?2004l\u001b[1;1H\u001b[1;31r\u001b]112\u0007\u001b[1;1H"]
[5.189482, "o", "\u001b]0;Karuppiah-N ❐ 0 ● 1 bash...\u0007\u001b[?25l\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\r\n\u001b[K\u001b[38;5;16m\u001b[48;5;226m\u001b[1m\r\n ❐ 0 \u001b(B\u001b[m\u001b[38;5;254m\u001b[48;5;199m ↑ \u001b[38;5;199m\u001b[48;5;232m \u001b[38;5;254m\u001b[48;5;160m\u001b[1m\u001b[5m /dev/ttys009 %0' not ready>\u001b(B\u001b[m\u001b[38;5;254m\u001b[48;5;160m \u001b[38;5;16m\u001b[48;5;254m\u001b[1m <'cut -c3- ~/.tmux.conf | sh -s _hostname /dev/ttys009 false %0' not ready> \u001b(B\u001b[m\u001b[1;1H\u001b[?12l\u001b[?25h"]
```

The start of every line has some sort of timestamp or some number. I think
seconds? which keeps increasing. Not sure what the `o` stands for, and then
there's the letters or content that needs to be played or typed or shown on the
screen.

I got the source code to learn from it.

I have never worked on Python so this is tricky.

Anyways, I looked for some entry point. init or something I have heard of it
before. Anyways, I finally recalled that the command line command is called
play or something and found these files

`asciinema/commands/play.py`

On reading what it does, noticed the Player's play method being used, found a
file named player then

`asciinema/player.py`

This had some asciicast something and I was confused. On searching for files
named asciicast, I found two docs! Named v1 and v2 in markdown format.

Interestingly there are documentations about the format I think.

https://github.com/asciinema/asciinema/blob/develop/doc/asciicast-v1.md

https://github.com/asciinema/asciinema/blob/develop/doc/asciicast-v2.md

Now I get to read this! Wow, open source is really awesome!! :D

I get to basically learn from and build on top of what people have already done!
How cool is that?! And since this is all open, anyone can learn from it!! :D

I was just trying to comprehend all the code in asciinema related to player and
the timing and how the cast / recording is played. I realized it's a bit
complicated that I had imagined. I'm just going to take a pause and then come
back and then continue when I'm more awake. Going to sleep now!! :)

`asciinema/player.py` > `_play`

`asciinema/asciicast/v2.py` > `stdout_events`

`asciinema/term.py` > `read_blocking`

`asciinema/asciicast/events.py` > `to_relative_time` and many other functions/
methods

---

So many people use Ace editor!

https://ace.c9.io/#nav=production

---

Apparently for auto completion, I need to do this

```javascript
// enable autocompletion and snippets
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: false,
});
```

Not sure what live autocompletion means, but that's disabled above.

I noticed some nice demos at

`ace-builds/demo`

Loved the below ones

`ace-builds/demo/bookmarklet/index.html` - I tried different themes, soft wrap
and other simple features. I also bookmarked the link and double clicked on a
text area on the page and it turned into an ace editor!! Wow thing!! :D That
too a customized editor ;) :D

`ace-builds/demo/emmet.html` - I tried typing `html` and then tab. I also
tried `div.cool` and then tab.

`autocompletion.html` - auto completion! I tried typing `console.log` with
auto completion

`autoresize.html` - based on size on the html page, or based on the settings it
has like min lines and max lines, I could see differences in auto resizing. It
was cool actually! :)

`ace-builds/demo/settings_menu.html` - cool stuff by showing a settings menu,
and that too with key binding!! :D

`ace-builds/demo/shadow-dom.html` - it's cool! It's like the codepen.io , or
jsbin.com and similar websites where you get to build a live web page / web app
all by coding in a web app itself.

`ace-builds/demo/toolbar.html` is nice too! Save, undo, redo and all.

`ace-builds/demo/transform.html` has CSS transforms and the editor looks cool
in various angles and also totally upside down too!! :D

Didn't understand these though / couldn't understand how to view the demo -

`chromevox.html`
`code_lens.html`

---

Record and Replay:

Let's say I want to build something like scrimba.com - where there is audio and
a editor where the instructor types out stuff. Surely many might have built
something like this. I want to build one myself though! :P

For this I was thinking how it can be done. So, there are two parts to it.

One is the recording of the text / code content in the editor
Another is the recording of the audio by the instructor

Also, these are sync by the way.

And the cool feature is, you have a player - with play and pause button and a
seek with a timeline. You can go forward and backward!! :D

What this means is, when going backward, the text content in the editor should
only have old stuff. In scrimba.com I see that when I go backward, the text is
also getting deleted / undone. Like someone pressed undo.

Audio - going backwards, I think it's easy. There are already audio players.
Surely there must be some recording and code editor players too, I guess.

Anyways, I was thinking how such a thing can be built.

For audio, clearly we need a simple audio player, like the browser's built-in
media player for video/audio.

The tricky part is, we also need to sync the text editor recording being played
with how the audio plays. It should be in sync. So, even while recording, the
audio and the text should be recorded in such a way that there is content for
exactly one duration. One tricky part with text content is, I think it might be
hard to understand the duration. Or, maybe not. I mean, there must be a start
and end time. I should not record anything in between. There might be an initial
state for the text editor though, with some pre-existing code, after which the
recording starts. Anyways. Also, scrimba.com also shows existing code when the
recording starts.

I think text content recording should also have precise duration so that it's
clear as to how long it was recorded. But like any other media, nothing much
will be there in some parts of the duration if there was no new data. At least
in text content recording, if no new character was typed, it will just have no
data for that time. But the recording might still end a lot later, when the
stop button was pressed for the recording. :)

Also, my idea was that - when the recording is played, the user cannot edit the
editor content. I mean, it's a recording. We can play, pause, resume, go
forward, go backward. You don't edit a recording that's playing, unless it's
some sort of editing software. But I'm only planning to create a recorder and a
player of sorts. Not an editor. But scrimba.com does have editing too, but when
resuming, it resumes from where it left off. It shows a small icon on the seek
at that point to ask if we want to save our edits etc. Nice thing! :)

In ace editor, in read only mode, the user cannot edit, but they can still
select code, copy and stuff :)

I think for going forward and backward, it's going to be tricky. For now, I'm
not planning on creating a player with so many options. Just play is the option
for now. Not even pause I think. :P

But for forward and backward, it will just be applying changes to the editor
very fast or undoing the applied changes based on time. It's a very tricky thing
though.

Also, the player should be in such a way that I can get events for when it is
paused, played, resumed, seeking forward or backward etc so that I can control
the playing of the text editor recording. But I won't do anything to the audio
playing.

But both the audio and text editor should be played with one single player,
at least from the UI perspective. Only one set of tools. It should be like the
text and audio come together.

Even for the recording, we should export two files - text and audio. I'm
wondering how it can be one file. Not sure. Maybe two is better. Maybe it can
compressed into one if needed, like a zip, tar, tar.gz etc.

The player should take both of these files - text and audio and then play the
audio and the text recording.
