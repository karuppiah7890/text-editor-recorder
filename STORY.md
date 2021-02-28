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
Another is, for teaching purposes. For example Scrimba has this recording where
there's a recording of the code typed out and a voice over. I think the same
can be done for workshops or coding tutorials. People on low bandwidths will
benefit a lot if the only thing to show is code. So, there can be audio, which
is low data and then recorded code being typed out which is again low data
compared to a video which will have resolutions and what not and video may not
even be clear and hence text may not even be clear.
I think there are more tools with similar ideas. For example asciinema records
terminal like this. There are also existing tools that record user typing. You
can see it as plugins on code editors and as a feature used in coding platforms
for interviews. I haven't used any other standalone tool yet. Will check it out
soon! :)

Which brings me to the point - how does asciinema record terminal? How does the
data stored look like? Check the timing and understand how they play the log.
Also check how tools play subtitles :)

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

Example - https://scrimba.com/scrim/cPLv2cZ?pl=p7P5Hd

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

---

Back to the concept of implementing the recording. :)

```javascript
editor2.session.redoChanges([delta]);
```

The above is what I had used to apply one change / one delta. I noticed that
this caused the change to be applied but the editor always selected the change
or something. I recalled that there's another argument to this, something about
select.

```
redoChanges(Array deltas, Boolean dontSelect): Range

Re-implements a previously undone change to your document.

Arguments:
deltas: Array >
Required. An array of previous changes

dontSelect:	Boolean >
Required. If true, doesn't select the range of where the change occurred
```

```javascript
editor2.session.redoChanges([delta], true);
```

I had to use `true` to not select the changes.

---

I continued my research on asciinema and subtitles and how they work. I haven't
read a lot of stuff. But this is what I found -

Method for showing subtitles

https://softwareengineering.stackexchange.com/q/381871/363229

Complicated - https://patents.google.com/patent/RU2668721C1/en

Web solution - https://www.w3.org/TR/webvtt1/

Timed Text Working Group
https://www.w3.org/AudioVideo/TT/

Timed Text Markup Language (TTML) and WebVTT (Web Video Text Tracks)

https://www.speechpad.com/captions/xml

https://www.speechpad.com/captions/ttml

https://w3c.github.io/webvtt/

https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API

https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video

https://github.com/videojs/vtt.js/

https://github.com/mozilla/vtt.js

Showing subtitles seems to be like a complex thing and there are a lot of
complex solutions out there. One difference between subtitles and text
recording is - in text recording, it's only a log of stuff and you play it out.
At least that's the basic feature. But in subtitles, you show it and then make
the old subtitles disappear based on time. I was trying to understand the time
part of it but then couldn't

---

I wanted to checkout about JavaScript timers just to understand it, thinking I
might need it

Javascript timer

http://stackoverflow.com/questions/29971898/ddg#29972322

https://www.sitepoint.com/creating-accurate-timers-in-javascript/

---

Recording user typing and Replaying

When user records, take a snapshot of the editor and immediately attach a
listener to listen for changes and record the user typing. Only after this,
show the user that the recording has started. Maybe disable editor till
recording starts.

After recording is stopped, remove the listener that listened for changes

While playing the recording, start with the snapshot and then start adding
changes

This way, the user is not forced to start recording from scratch. Also, they
don't have to copy and paste something big after starting to record. They can
simply record even if they already have some content and the recorder will
record it. !!! :D how cool is that? Like a camera!! :)

---

For asciinema, I was fortunate enough to read the code and after lots of
thinking I think I know how it works to a basic extent, at least for the
features I'm initially looking forward to, though it had pause and stuff.

---

Like asciinema, I'm going to adopt the v2 of the asciinema recording format,
or what they call as cast format.

v1 looked nice
https://github.com/asciinema/asciinema/blob/develop/doc/asciicast-v1.md
but it had some downsides apparently, which is mentioned in v2
https://github.com/asciinema/asciinema/blob/develop/doc/asciicast-v2.md

So, I'm going with new-line delimited JSON. So, something like

```json
{"obj": 1}
{"obj": 2}
```

But JavaScript can't parse it though.

```javascript
let jsonstr = '{"obj": 1}\n{"obj": 2}';
JSON.parse(jsonstr);
```

It gives the error

```javascript
Uncaught SyntaxError: JSON.parse: unexpected non-whitespace character after JSON data at line 2 column 1 of the JSON data
    <anonymous> debugger eval code:1
```

So, maybe we can do this

```javascript
jsonstr.split("\n").forEach((e) => console.log(JSON.parse(e)));
```

which gives

```javascript
Object { obj: 1 }

Object { obj: 2 }
```

So, I guess that will do. Also, apparently this kind of new-line delimited
JSON is nice for streaming

Something to note is, this format also talks about how the recording is done
immediately or something similar. In v1, it was one big JSON with all the data.
If something goes wrong in between - crash etc, then all the data present in the
memory might not be converted to the big JSON. The big JSON can be obtained
only when the recording stops. But in v2, I think the recorder can keep
appending the data about the recording as and when it happens and doesn't have
to wait till the end, as the storage is not a one big JSON :) I guess this is
very advantageous!! :)

I noticed that asciinema has one issue which talks about stepping back in
terminal replay but that web player has jt. At that point I recalled that
asciinema has a web player and that the web player actually has play, pause,
going back and forward too. But I don't remember using it much. I need to use
it. Not sure how they implemented it and if they used the same file format for
cast storage. I think they used the same. As I noticed the format doc mention
about it's usage in different tools like web player and terminal recorder.

This is the feature -
https://github.com/asciinema/asciinema/issues/404

There are many more interesting issues / feature requests

Custom font -
https://github.com/asciinema/asciinema/issues/421

Splitting the recording -
https://github.com/asciinema/asciinema/issues/399

Quoting - not sure exactly if they mean just for preview image or for more
https://github.com/asciinema/asciinema/issues/427
But they want to go to a specific moment, which seems to be possible and also
highlight some text for discussion. Hmm

---

I finally tried the web player version of asciinema for tinkering purposes and
not just simply playing from first to last.

I noticed that I can't pull the seek thingy. I can click on the timeline and the
seek goes back. So, I guess they have a difficulty in "undoing" as that's
something hard and crazy to do with the kind of data they have, also, it's
a terminal. It would be weird to see the characters that appeared to go away one
by one, including user typed characters. So, I guess this makes sense. But this
terminal session recording is unlike recording a coding session. In coding, it's
easy to show undo and makes sense too.

---

Another thing I noticed about the code that I currently use to apply changes is,
the user can keep the cursor anywhere in the replay (live replay) but they can't
change the code. Also, it doesn't show where the current cursor is present. I
think it would be interesting to record that too, and show it properly. Mostly,
the cursor will be present at where the change is happening. But let's say the
user is moving around in the code and highlighting and stuff, at least for the
moving around part, the recording can show the cursor. Let's see.

Showing / recording the highlighting, folding / unfolding, the autocompletion,
all this would be sooooo cool! :D But I'm not sure how the going backwards will
work there. It would be weird to show the autocompletion stuff too while going
backwards in time in the player. Hmm. Or maybe it's not weird. I don't know.
We will know when it gets implemented and if it gets implemented :P :P Hmm

About the timing, I read the asciinema code.

https://github.com/asciinema/asciinema/blob/develop/asciinema/player.py

I can see the `_play` method which I already say. I'm going to just take this
part

```python
self._play(asciicast, idle_time_limit, speed, stdin, key_bindings)
```

And then go on from here

```python
 def _play(self, asciicast, idle_time_limit, speed, stdin, key_bindings):
        idle_time_limit = idle_time_limit or asciicast.idle_time_limit
        pause_key = key_bindings.get('pause')
        step_key = key_bindings.get('step')

        stdout = asciicast.stdout_events()
        stdout = ev.to_relative_time(stdout)
        stdout = ev.cap_relative_time(stdout, idle_time_limit)
        stdout = ev.to_absolute_time(stdout)
        stdout = ev.adjust_speed(stdout, speed)
```

So, there are some extra options like idle time limit - I think this is the time
limit up to which the recording can show idleness between two actions / changes.
Above this time limit, it will not be tolerated and the action will immediately
happen I think.

For example, if I type "function" and then wait for 5 seconds and then type
"add() {}", then the player with option of idle time limit as 1 second will type
the "function" and then wait only for 1 second and then immediately type the
"add() {}" I think. This is just my assumption based on the code I read.
However I'm not going to be configuring such time limit as of now but it's
interesting to note all this. :)

There are key bindings / keyboard shortcuts for pause and something called step.
Not sure what step is, but I'm going to skip for now any of these cool stuff :P

Next is the `asciicast.stdout_events()` method call. This method is here

Assuming v2 format will be read by v2 asciicast code

https://github.com/asciinema/asciinema/blob/develop/asciinema/asciicast/v2.py

As I really don't know how to read full python code yet, so just based on
assumption I'm going with this! :)

The method is here

https://github.com/asciinema/asciinema/blob/develop/asciinema/asciicast/v2.py#L28

```python
def stdout_events(self):
    for time, type, data in self.events():
        if type == 'o':
            yield [time, type, data]
```

I haven't worked with stuff like `yield` or the iterator and other fancy stuff.
But I think I can guess what it does. It gives out data in some iterative
fashion I think.

So, this is the method that reads the events with `events()` which is here

https://github.com/asciinema/asciinema/blob/develop/asciinema/asciicast/v2.py#L24

like this

```python
import json

def events(self):
    for line in self.__file:
        yield json.loads(line)
```

So, now, we see that it loads the JSON and then gets the time, type of data,
in this case "o" which is "output" and then the data itself.

And then there are these lines

```python
import asciinema.asciicast.events as ev

stdout = ev.to_relative_time(stdout)
stdout = ev.cap_relative_time(stdout, idle_time_limit)
stdout = ev.to_absolute_time(stdout)
stdout = ev.adjust_speed(stdout, speed)
```

What this `ev.to_relative_time(stdout)` does is -

https://github.com/asciinema/asciinema/blob/5816099c4bd3c151144414f5a245405b926d6c76/asciinema/asciicast/events.py#L1

It converts the timing data present within the program. So, according to the
storage format, it's like

3, event1
5, event2
8, event3
12, event4

which means, event1 happens after 3 seconds since the start, event2 happens
after 5 seconds since the start, event3 after 8 seconds from the start and so
on. This is absolute timing of events based on the recording start time. This
is converted to a relative time like

3, event1
2, event2
3, event3
4, event4

What this means is, event1 occurs 3 seconds after the previous thing, in this
case, the start of the recording. event2 occurs 2 seconds after event1. event3
happens 3 seconds after event2, and so on. Now, this is called relative time
or relative timing as this is timing each event based on the previous event.

Now, why are we doing this? I mean, if we want this, why not store it in this
format, the relative timing format. Actually that's how v1 was stored. But I
think the catch is that, if one wants to jump directly to say the 5th second
from the start or say the 8th second from the start, with relative timing, we
need to add up the different relative times to understand which event is going
to happen at the 5th second from the start. In the above case, add 3 and 2 and
get 5 which shows that event2 happens at 5th second from the start. event3
happens at 8th second from the start (3 + 2 + 3). Anyways, that's just my guess
of why the format changed in v2 to show the absolute timing. Also, there are
reasons mentioned in the format documentation which I didn't exactly understand.
I need to research and dig more to understand them. Anyways, now, back to the
question, why do this? Well, for this we need to check the next operation.

`stdout = ev.cap_relative_time(stdout, idle_time_limit)`

Remember the idle time limit? For that reason we do relative timing and check
the time / delay between two events by understand the timing of events based on
the previous events.

`cap_relative_time` implementation -

https://github.com/asciinema/asciinema/blob/5816099c4bd3c151144414f5a245405b926d6c76/asciinema/asciicast/events.py#L20

You can see how there's a `min` function used among `delay` and the
`time_limit`. This way, we try to go with the minimum value - if delay is
lesser than the time limit, that's fine. `time_limit` is out limit or threshold
and we can't go above it. So, if there was a delay like 5 seconds like the
example I mentioned and if the limit is 1 second, the min will be 1 second.

So, that's why we did relative timing I think. Again, just my assumption, as I
don't see a point otherwise :)

Next we do `ev.to_absolute_time(stdout)`. The definition of the function is
here

https://github.com/asciinema/asciinema/blob/5816099c4bd3c151144414f5a245405b926d6c76/asciinema/asciicast/events.py#L11

Why do this? Well, I think we need absolute time only. Hence the format. We just
had to go to an intermediate state - the relative timing - for the capping or
limiting of delays between the events. So, this is like going back to the
actual format we want.

Finally there's a `ev.adjust_speed(stdout, speed)`. Definition is here

https://github.com/asciinema/asciinema/blob/5816099c4bd3c151144414f5a245405b926d6c76/asciinema/asciicast/events.py#L27

```python
def adjust_speed(events, speed):
    return ([delay / speed, type, data] for delay, type, data in events)
```

I was surprised at the number of options this tool has. I was trying to
understand this function. I realized how cool it is.

So, `delay` is in seconds. I'm not sure what is the unit of `speed` here.
But assuming it's just a number, higher the number seems like higher speed. Why?
Well, based on mathematics, delay is the time of the event from the start of the
recording. If the delay of the event occurring is lesser, the event occurs
faster. So, when you divide delay by a bigger number, for example any number
above 1, then the value of `delay / speed` decreases, and the final result is
the final delay, which is lesser now and hence the event happens faster. Now,
if the speed value is less than 1, then `delay / speed` value is more than
`delay` and hence resulting delay increases and hence the event occurs slower.

So, in general, if the speed value increases, the final delay value which is
`delay / speed` decreases, which means the event occurs faster / at fast speed.
Similarly if speed value decreases, the final delay value which is
`delay / speed` increases, which means the event occurs slowly / at slow speed.

The next few lines are

```python
base_time = time.time()
ctrl_c = False
paused = False
pause_time = None
```

I'm not going to check much about the ctrl_c, paused / paused_time stuff as I'm
not yet going to implement any of those. It's actually to interrupt the
recording and to pause.

The next lines are

```python
for t, _type, text in stdout:
    delay = t - (time.time() - base_time)

    while stdin and not ctrl_c and delay > 0:
        if paused:
            while True:
                data = read_blocking(stdin.fileno(), 1000)

                if 0x03 in data:  # ctrl-c
                    ctrl_c = True
                    break

                if data == pause_key:
                    paused = False
                    base_time = base_time + (time.time() - pause_time)
                    break

                if data == step_key:
                    delay = 0
                    pause_time = time.time()
                    base_time = pause_time - t
                    break
        else:
            data = read_blocking(stdin.fileno(), delay)

            if not data:
                break

            if 0x03 in data:  # ctrl-c
                ctrl_c = True
                break

            if data == pause_key:
                paused = True
                pause_time = time.time()
                slept = t - (pause_time - base_time)
                delay = delay - slept

    if ctrl_c:
        break

    sys.stdout.write(text)
    sys.stdout.flush()
```

`stdout` has the stream of events / list of events, with time, type and the data

`delay` is the time to wait to show the data. How did I find it out? So, `delay`
is defined as

`t - (time.time() - base_time)`

`base_time` is the start time of the recording I think, or more like start time
of the playing of the recording. It's a constant.

`time.time()` is the current time I think, the current time at the time of that
line's execution. The difference gives the time that has elapsed from the start
of the playing of the recording.

`t` is the time at which the event should happen, or the data should be printed
basically.

Let's say for the first data I type in the terminal, I take 5 seconds to type
it. So, `t` is 5 seconds. Since the loop starts immediately, the time difference
of `time.time()` and `base_time` won't be much, but it will be positive. Now,
subtract that from 5 seconds and you get a big value, like something between
4 and 5 seconds. Now, the program needs to wait for around 5 seconds to show the
first data that I typed during the recording.

I'm ignoring the `if paused` block as I'm not into pausing as of now.

Let's look at the else part. There's a `read_blocking` from

`from asciinema.term import raw, read_blocking`

https://github.com/asciinema/asciinema/blob/develop/asciinema/term.py#L28

```python
def read_blocking(fd, timeout):
    if fd in select.select([fd], [], [], timeout)[0]:
        return os.read(fd, 1024)

    return b''
```

So, here we see that there's some `select.select`. From python docs,

https://docs.python.org/3/library/select.html#select.select

```
The optional timeout argument specifies a time-out as a floating point number
in seconds.
```

Some more links:
https://duckduckgo.com/?q=python+select.select&t=fpas&ia=qa

https://stackoverflow.com/questions/11591054/python-how-select-select-works#11591492

So, we are basically waiting for reading from the standard input I think -
`stdin`. We wait in a blocking manner. But if we have a timeout, we only wait
till that time. Why are we waiting to read from standard input, well, since this
is a terminal application, we are checking if the user is trying to exit from
the app anytime with ctrl + c keyboard shortcut or pause using a keyboard
shortcut.

So, let's skip those stuff. Basically, we wait for some delay amount of time.
This is how we get the delay. I need to check how to simulate this delay in
JavaScript - sleep? setTimeout? what's accurate? Gotta check.

If there's no data from the user in this time, the loop breaks and then the
data is show to the screen! :)

---

Steps to create a recorder and player for code editor.

Recorder:

- Create a UI for recording
  - There should be a button to start recording and to stop recording
- Recording button
  - Once the user clicks it, the recorder should first take a snapshot of the
    current editor content. Till the snapshot is taken, it should keep showing
    "going to record". After the snapshot is done, only then it should start
    recording and show "recording"
- Stop recording button
  - Once the user clicks it, the recorder should remove anything that is used to
    record the actions of the user
  - I don't see any edge cases here, like user typing in between when the
    recording is being stopped. I don't mind any such cases too. But in the web,
    when user is clicking a button to stop recording, the focus is on the button
    and focus is not on the editor / it's out of the editor. But the user can
    click the button and immediately start typing in the editor. Maybe to avoid
    that kind of thing, once the stop is clicked, the editor should be disabled
    or made readonly on the so that the recording can be stopped and the data
    storage work is all done. Ideally data storage will keep happening in a
    streaming manner. Anyways. Once all the post recording work is done, show
    "stopped recording" message somehow and then re-enable the editor so that
    the user can start typing again :)
- Download the recording as JSON
  - There should be a way to download the recording as a JSON
  - Should we store the recording in local storage or indexed db or something?
    Or just keep it in memory for now?
  - This JSON file will be used to import the data in a player so that the
    player can play the recording

Player:

- Create a UI for player
  - An import button to import the JSON file of the recording
  - Start button to play the recording

---

Timers

https://www.npmjs.com/search?q=timer

---

Let's start with the recorder!

I'm starting to use version 1.4.12 instead of 1.4.11

https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js

---

I want to be able to download the recording. For this I want the user to be
able to download the file but just from the HTML and Js code. No server
required kind of a thing. Hmm

https://duckduckgo.com/?t=ffab&q=web+api+download&ia=web

https://duckduckgo.com/?q=web+api+download+file&t=ffab&ia=web

https://duckduckgo.com/?q=web+api+download+file+mozilla&t=ffab&ia=web

https://duckduckgo.com/?q=web+api+download+content+mozilla&t=ffab&ia=web

https://duckduckgo.com/?q=web+api+save+data&t=ffab&ia=web

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download

https://duckduckgo.com/?q=web+api+js+code+to+download+in-memory+content&t=ffab&ia=images&iax=qa

http://stackoverflow.com/questions/3665115/ddg#18197341

---

For now I'm planning to store a big JSON to start off with. Like

```json
[{ "initialContent": "function add() { }" }, {}]
```

As now I'm just storing everything in-memory and finally downloading it. If it's
any different I could use new-line delimited JSON and keep storing it with
multiple JSONs as and when changes happen.

Also by the way, new-line delimited JSON getting stored in a `.json` file is
weird as according to JSON it's not one big JSON. It's multiple JSONs delimited
or separated by a new line. asciinema called it `.cast` file :) and had their
own media type. Gotta check it out. But I guess I could do that too! :D

Maybe call it ".coderecording". Too big? 🤔 ".coderec" ? Hmm or more like,
".textrec" as any text can be recorded! :D

---

I tried out the recording, but some issue happened with the download button.
I messed up with the disabling part

https://duckduckgo.com/?t=ffab&q=web+api+setAttribute&ia=web

https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example

I made the mistake of giving `disabled` attribute a value. It's more like a
boolean attribute, no value is present for it

```html
<button id="download-recording" disabled>Download Recording</button>
```

```javascript
downloadRecordingButton.setAttribute("disabled", true);
```

So, I need to do this

```javascript
downloadRecordingButton.setAttribute("disabled", "");
```

And I need to use `removeAttribute` instead of using `false` or even `null` for
the attribute value as there's no value really in the first place!

https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute

So, instead of

```javascript
downloadRecordingButton.setAttribute("disabled", false);
```

It's gonna be

```javascript
downloadRecordingButton.removeAttribute("disabled");
```

And I finally tried it out and it worked!!!! YAY!!!!

```json
[{"initialContent":"function add(a, b) {\n    return a + b;\n}"},{"start":{"row":1,"column":16},"end":{"row":1,"column":17},"action":"insert","lines":[" "]},{"start":{"row":1,"column":16},"end":{"row":1,"column":17},"action":"remove","lines":[" "]},{"start":{"row":0,"column":17},"end":{"row":0,"column":18},"action":"insert","lines":[" "]},{"start":{"row":0,"column":17},"end":{"row":0,"column":18},"action":"remove","lines":[" "]},{"start":{"row":0,"column":17},"end":{"row":0,"column":18},"action":"insert","lines":[","]},{"start":{"row":0,"column":18},"end":{"row":0,"column":19},"action":"insert","lines":[" "]},{"start":{"row":0,"column":19},"end":{"row":0,"column":20},"action":"insert","lines":["c"]},{"start":{"row":1,"column":16},"end":{"row":1,"column":17},"action":"insert","lines":[" "]},{"start":{"row":1,"column":17},"end":{"row":1,"column":18},"action":"insert","lines":["+"]},{"start":{"row":1,"column":18},"end":{"row":1,"column":19},"action":"insert","lines":[" "]},{"start":{"row":1,"column":19},"end":{"row":1,"column":20},"action":"insert","lines":["c"]}]
```

So yeah, it didn't have indentation just to keep the space usage lesser - extra
spaces uses up extra data. But if the above has indentation it's because my
editor automatically indented it when I saved it!

Next I need to work on the player! Umm, okay, I missed one important thing. Lol.
The timing. Hahahaha. I need to add timings to the recording file. Right 😅 🙈
