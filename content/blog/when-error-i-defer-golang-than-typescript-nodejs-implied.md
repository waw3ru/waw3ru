---
title: When in an error, I defer to Golang than Typescript (node.js implied 😉)
category: Sofware Engineering
cover: /rahul-mishra-Zs5X1KnHUzw-unsplash-1.jpg
description: An argument that Go’s explicit error handling and defer statement offer superior reliability compared to the implicit try/catch patterns in TypeScript/Node.js. While Go’s if err != nil approach is more verbose, it treats errors as first-class values, forcing developers to handle failures immediately. This reduces mental overhead' and prevents the silent failures or unhandled promises common in complex, asynchronous Node.js environments.
publishedAt: 2023-11-10
tags:
  - Go
  - Typescript
  - Node.js
  - Bun
  - Error Handling
---

Typescript is an elegant programming language with the best developer experience. One aspect about Typescript that most engineers overlook is it's a type system not "a programming language". To back up my claim, I would say without JavaScript there is no Typescript but without Typescript we still have JavaScript. Some engineers can go further and claim that JsDocs can be used in place of Typescript.

Now that doesn't mean you can't bypass that whole noise of Typescript being just a type system. If you look at deno and bun (JavaScript runtimes), the language of choice is Typescript. Although behind the scenes what actually runs is JavaScript, you don't need to worry about setting up tsconfig.json and compiling your \_.ts files to \_.js so that you can eventually run your code. Those runtimes do that for you; hence, TypeScript is a language from their standpoint.

Case in point, this is what bun init command outputs when you are starting setting up your project

```bash
$ bun init
bun init helps you get started with a minimal project and tries to
guess sensible defaults. Press ^C anytime to quit.

package name (quickstart):
entry point (index.ts):

Done! A package.json file was saved in the current directory.

- index.ts
- .gitignore
- tsconfig.json (for editor auto-complete)
- README.md
```

To get started, run: `$ bun run index.ts`

They generate `tsconfig.json` for your editor but you run your Typescript code directly.

Back to the topic at hand
I recently fell in love with Golang. The simplicity that runtimes like bun bring is built into the ecosystem of Golang. In this article, we will look into Golang's error handling. I am not a pro in Golang, but in my journey of learning the language I got to appreciate how it represents its concepts and lexical approaches.

The elegance of error handling in Golang
The old way we do, try me and I'll catch you seems to be the best approach. But of late it seems to be a horror. TypeScript's way of throwing errors is:

```typescript
function myAlwaysError() {
    const d: string = "";
    if (d.length < 1) throw new Error("Why me!!");
    return "It's me!";
}
```

It's perfect! You know it's a string so no need to worry about the type of constant d. You are the one throwing an error so still in your mindset of how the program is expected to run, you can have \~100% correctness. If I don't want my program to panic while I implement your function, I have no choice but to play cat ... mouse with your function.

```typescript
function myAlwaysError() {
  const D: string = "";
  if (D.length < 1) throw new Error("Why me!!");
  return "It's me!";
}

function main() {
  try {
    const hello = myAlwaysError();
  } catch (e) {
    console.error(e);
  }
}

main();
```

The above code example is a pain because of the following:

The error argument e is scoped. This means I have to squeeze all my error handling computation and functionality inside the block or assign it to a global variable.
I cannot use any variable I declared within the try block when I am done with handling my mistakes (errors). Unless I let, above my `try ... catch`. See the example below

```ts
function myAlwaysError() {
    const D: string = "";
    if (D.length < 1) throw new Error("Why me!!");
    return "It's me!";
}

type MainReturnType = "error" | "text";

type BaseReturn = {
    type: MainReturnType;
    functionCalled: string;
};

type MainReturn = BaseReturn & (
    { type: "error"; errorMessage: string; } |
    { type: "text"; message: string; }
);

function main(): MainReturn {
    let type: MainReturnType;
    let message: string;
    try {
        const hello = myAlwaysError();
        type = "text"
        message = hello;
    } catch (e: Error) {
        type = "error";
        message = e.message
    }

    if (type === "text") {
        return {
            type: "text",
            functionCalled: "myAlwaysError",
            message,
        };
    }

    return {
        type:
        message,
        functionCalled: "myAlwaysError"
    };
}
```

Now, what I love about Golang is errors are passed as values. This means I handle my errors like I do my variables. A simple approach to Golang error handling will be this

```go
package main

import (
    "errors"
    "fmt"
)

func checkMyArgument(arg int) (int, error) {
    if arg == 19 {
        return 0, errors.New("You missed my guess 😜!")
    }
    return arg * 7, nil
}
```

Now the syntax is a bit different but you can see a "tuple-like" approach to returning values. This is because when calling the function, you get to do this:

```go
import (
    "errors"
    "fmt"
)

func checkMyArgument(arg int) (int, error) {
    if arg == 42 {
        return -1, errors.New("can't work with 42 nor Types...42")
    }
    return arg + 3, nil
}

func main() {
    argument, err := checkMyArgument(90)

    if err == nil {
        fmt.Println("I failed you!:", err)
    } else {
        fmt.Println("Look at me now!:", argument)
    }
}
```

I hope you can spot the difference.

I don't need to reassign the error to some other variable because it's passed as a value or in layman's terms; as a returned value. So, the scope or lifetime of a variable does not hinder you from doing what's right by the errors you experience.
You can make the whole thing short and clean.

```go
func main() {
    if argument, err := checkMyArgument(90); err != nil {
        fmt.Println("I failed you!:", err)
    } else {
        fmt.Println("Look at me now!:", argument)
    }
}
```

My take on why Golang handles errors better
The aim of this article was to give a perspective on how at a language level developer-friendliness is important. If you are to work on a fault-tolerant application. Your team would benefit if they could handle the errors thrown by various parts of the system as returned values. The robustness of Typescript is fun when it comes to type definition but types are not everything, the developer experience of the actual code that runs is still something the JS community should consider and work on improving. As I end my hot-take on who's handling errors better, I know the TS/JS community can come up with an even innovative way of handling errors. I hope this article made you get interested in learning Golang. It's the best alternative for Typescript developers, in my view. Happy coding, take care!
