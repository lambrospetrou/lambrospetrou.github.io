---
title: Solve the eight queens problem with Elixir
description: A naive recursive solution to the queens positioning problem using Elixir comprehensions.
---

## Problem

While I was learning Elixir I wanted something to use the [for-comprehension](http://elixir-lang.org/getting-started/comprehensions.html) to solve a problem. I remembered the [Eight queens puzzle](https://en.wikipedia.org/wiki/Eight_queens_puzzle) back from my college courses so I decided to give it a go.

I adapted the problem a bit, so my solution takes as inputs the following:

```
Inputs
======
n: number of queens to position on the board
m: size of the board side

Outputs
=======
List of all the solutions (List[List[int]])
```

## Naive Solution

The solution is simple, and uses **backtracking** to iterate over all possibilities and select the valid ones.

```elixir
defmodule Queens do

  @doc """
  Given n number of queens and m the size of the checkerboard, find all solutions to 
  position each queen so that it does not collide with any other queen vertically, 
  horizontally or diagonally.
  """
  def solve(0, _m), do: [[]]
  def solve(n, m) do
    for done_queens <- solve(n-1, m),
        avail_pos <- (Enum.to_list(1..m) -- done_queens),
        safe_pos(avail_pos, done_queens, 1), 
      do: [avail_pos | done_queens]
  end

  defp safe_pos(_, [], _), do: true
  defp safe_pos(pos, [queen | queens], distance) do
    (pos != queen + distance) and 
    (pos != queen - distance) and 
    safe_pos(pos, queens, distance+1)
  end

end
```

Obviously, this is **not** the fastest algorithm to solve this problem (exponential complexity), but it shows how elegant the solution can be using Elixir's comprehensions.

Sample output in **iex**:

```elixir
iex(47)> c("queens.ex")
[Queens]
iex(48)> :io.write Queens.solve(4, 4)
[[3,1,4,2],[2,4,1,3]]:ok
iex(49)> :io.write Queens.solve(3, 4)
[[2,4,1],[1,4,2],[4,1,3],[3,1,4]]:ok
iex(50)> :io.write Queens.solve(5, 5)
[[4,2,5,3,1],[3,5,2,4,1],[5,3,1,4,2],[4,1,3,5,2],[5,2,4,1,3],[1,4,2,5,3],[2,5,3,1,4],[1,3,5,2,4],[3,1,4,2,5],[2,4,1,3,5]]:ok
iex(51)> :io.write Queens.solve(1, 5)
[[1],[2],[3],[4],[5]]:ok
```

**Demo:** http://elixirplayground.com?gist=688be58a64712a172878a58683ed0eda

## Conclusion

Every day I learn more and more Elixir (and Erlang) and I can say that it's among the few languages that managed to keep me interested and excited for more than 3-4 months (looking at you Scala and Python).

