---
title: "Investing in 3x Daily Leveraged Nasdaq 100 ETFs (TQQQ or QQQ3) using QQQ weekly MACD signals"
description: "A long-term strategy with over +10,000% of profit using MACD weekly signals from QQQ to exploit the bull runs of 3x Daily Leveraged ETFs like TQQQ."
---

For the past few months I have been backtesting a long-term investing strategy with a friend, and we started following it since 2 months ago.

The backtesting results are great. **More than +10,000% total profit from 2012 to 2025.**
Hopefully the future results will be too.😉💸

<figure>
<a href="https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-ndx-tester-only.png" target="_blank"><img src="https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-ndx-tester-only.png" title="Screenshot from trading view QQQ3/NDX strategy tester showing the profits"/></a>
<figcaption>
MACD-weekly strategy executing QQQ3 using Nasdaq 100 index (NDX) signals.
</figcaption>
</figure>

All backtesting is done in [TradingView](https://www.tradingview.com/pricing/?share_your_love=lphulk) (referral link so we both get $15) using their awesome PineScript platform and the [strategy tester](https://www.tradingview.com/support/solutions/43000562362-what-are-strategies-backtesting-and-forward-testing/). I love it.

**Table of contents**

- [TLDR](#tldr)
- [Assumptions and requirements](#assumptions-and-requirements)
- [Past research with leveraged ETFs](#past-research-with-leveraged-etfs)
- [Room for improvement](#room-for-improvement)
    - [Weekly signals](#weekly-signals)
    - [Moving Average Convergence and Divergence - MACD](#moving-average-convergence-and-divergence---macd)
    - [Cross symbol strategy](#cross-symbol-strategy)
- [Risk management with stop losses](#risk-management-with-stop-losses)
- [Tricks and tweaks](#tricks-and-tweaks)
- [Backtesting](#backtesting)
    - [QQQ3 with QQQ signal](#qqq3-with-qqq-signal)
    - [QQQ3 with NDX signal](#qqq3-with-ndx-signal)
    - [TQQQ with QQQ signal](#tqqq-with-qqq-signal)
    - [Scottish Mortgage Trust (SMT) with QQQ signal](#scottish-mortgage-trust-smt-with-qqq-signal)
    - [AVGO with QQQ signal](#avgo-with-qqq-signal)
    - [UPRO with SPX](#upro-with-spx)
- [Open questions](#open-questions)
- [Conclusion](#conclusion)

## TLDR

The strategy executes trades on 3x daily leveraged Nasdaq 100 ETFs ([TQQQ](https://www.proshares.com/our-etfs/leveraged-and-inverse/tqqq) in the US, and [QQQ3](https://www.wisdomtree.eu/en-gb/etps/equities/wisdomtree-nasdaq-100-3x-daily-leveraged) in the UK) using price signals from the original non-leveraged [QQQ](https://www.invesco.com/qqq-etf/en/performance.html).

The strategy exploits, and depends on, the massive bull runs of the Nasdaq 100 index ([see Nasdaq 100 components](https://www.slickcharts.com/nasdaq100)).
Using 3x daily leveraged ETFs makes the bull runs bigger and allows the strategy to generate amazing gains on the way up, since QQQ gaining a 1% means the 3x leveraged gain is about 3%.

However, using 3x daily leveraged ETFs also magnifies the losses on the way down, so the strategy employs strict risk management in order to cap and minimize the losses while retaining the bulk of the profits.

For the rest of the article I will focus on QQQ3 which is the 3x Daily Leveraged Nasdaq 100 instrument available for trading in Europe.
For folks trading in the US check out TQQQ.

OK, but what is the strategy? ...

Well, you have to read the article for the details.

If you just care for the results, jump to the [backtesting section](#backtesting).🚀

## Assumptions and requirements

If any of these assumptions does not hold anymore, then the strategy won't perform as well. _You have been warned!_

1. The US tech industry will continue to outperform the market over the next 10-15 years.
2. The new technology leaders will continue to list in the Nasdaq, otherwise the Nasdaq 100 index will lose its advantage.
3. Historically, the Nasdaq 100 has a big bull run every few years and overall trends upwards. This allows the strategy to offset losses made in whipsaw markets (oscilating up and down without clear trend).

These are the goals of the strategy and my personal constraints.

1. The strategy has to outperform the buy-and-hold Nasdaq 100 or S&P 500 over 10-15 years.
2. The strategy has to have better risk management from the buy-and-hold, with less overall drawdowns.
3. No intra-day trading. I don't have the time to sit in front of charts during the day, so working with closing prices only.
4. No more than 5 trades per month. The fees and the UK capital gains taxes will reduce profits.
5. Simple and easy to follow and execute.

To repeat the most important rule, the strategy has to be simple to reason about and easy to execute.
There is no point having a strategy that is hard to execute correctly.

## Past research with leveraged ETFs

After experimenting for a few weeks, we found a research published in 2016 by Michael A. Gayed (then updated to cover 2020) solidifying our findings and making them more concrete.

The publication ["Leverage for the Long Run - A Systematic Approach to Managing Risk and Magnifying Returns in Stocks"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2741701) uses the [S&P 500](https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview) (largest 500 US companies) and crossovers with moving average indicators (MA) as entry and exit signals, reducing the drawdown versus buy-and-hold. Then, goes on to use leveraged ETFs (1.5x, 2x, 3x) to magnify the bull runs (gains) while also managing the drawdowns using the 200 daily moving average.

Quoting from the publication's abstract:

>  This strategy shows better absolute and risk-adjusted returns than a comparable buy and hold unleveraged strategy as well as a constant leverage strategy. The results are robust to various leverage amounts, Moving Average time periods, and across multiple economic and financial market cycles.

This is a great read with lots of backtesting going back to 1928, and explains well the drawdown reduction is achieved.

![Screenshot from the publication showing the results using leveraged ETFs](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/publication-leveraged-sp500.png)

The above table and chart from the publication shows the impact of taking advantage of leveraged gains and capping the losses. Superb results.

Others have also discussed similar strategies, like this analysis by Logan Kane ["The Trading Strategy That Beat The S&P 500 By 16+ Percentage Points Per Year Since 1928"](https://seekingalpha.com/article/4226165-the-trading-strategy-that-beat-the-s-and-p-500-by-16-plus-percentage-points-per-year-since) that cites the publication above too.

## Room for improvement

Even though the above research shows great potential and gives a concrete way to outperform the market (S&P 500 in that case), we can do even better.

I implemented the 200-daily Simple Moving Average (SMA) strategy of the publication using the QQQ3 ETF (3x leveraged Nasdaq 100), and I noticed a few things that can be improved.

![Screenshot from trading view QQQ3 40W crossover with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-40w-sma-crossover.png)

1. There are false positive trades during whipsaw periods where there is no clear trend, like in 2016.
2. There are big drawdowns from the peak high price to our exit points (crossunder of the 200-daily SMA), wasting gains of the bull run, like in 2020.

We managed to reduce the whipsaw trades with some tricks and tweaks, but ultimately they are inevitable when the markets go sideways.

We love markets going up.

We are OK with markets going down, since we will exit.

We hate markets going sideways, since it increases costs and losses.

### Weekly signals

The first differentiating aspect of my strategy is that it uses **weekly candlestick charts** and only executes trades using weekly close prices.

As mentioned in the previous section, we want to avoid whipsaw periods where we enter and exit trades close to each other without making much profit, if any at all.
When this happens several times, losses are more likely than gains.

Using weekly charts reduces the amount of noise we have, and it also reduces the amount of trades we can do in a year.
Note that we use 40-week SMA now instead of the 200-daily SMA, same total duration.

This change reduced the total number of trades from 15 to 7, without any obvious whipsaw.

### Moving Average Convergence and Divergence - MACD

Once we settled on using weekly signals, the next improvement comes from addressing the big drawdowns from the peak highs.

For example, even though the COVID crash of March 2020 was short in duration, it was a significant dip.
The QQQ3 drawdown from peak high down to our exit when QQQ crosses under the 40W-SMA was an **eye-watering -62%**.

![TradingView screenshot QQQ3 with 40W strategy showing drawdown](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-40w-drawdown_2020.png)

We did many iterations and different variations of the SMA crossover approach with OK results.
Tweaks and tricks here and there and employing different sub-strategies while above the 40-weekly SMA to capture more of the bull run.
More details about some of these tricks might come in a separate article.

However, we decided to switch to using the weekly [MACD indicator](https://www.investopedia.com/terms/m/macd.asp) for our entry and exit signals, with tiny bit of tweaking to make it awesome.

I won't spend much time explaining the MACD indicator, but quoting directly from [Investopedia's MACD definition](https://www.investopedia.com/terms/m/macd.asp):

> Moving average convergence/divergence (MACD) is a technical indicator to help investors identify price trends, measure trend momentum, and identify entry points for buying or selling. Moving average convergence/divergence (MACD) is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMAs) of a security’s price.

In a nutshell, the MACD indicator has two lines, the MACD line and the Signal line.

The MACD line is calculated using the Exponential Moving Average (EMA) of two periods:
```
MACD = 12-Period EMA − 26-Period EMA
```

The Signal line is calculated by taking the EMA of the MACD line:
```
Signal = MACD 9-Period EMA
```

When the MACD line crosses above the Signal line it means that the price is going up, they get close when the price moves sideways, and the MACD line crosses under the Signal line when the price is going down.

The key crossover for us is not between the MACD line and the Signal line, though, it's **between the MACD line and the zero line**.

When the MACD line crosses over the zero line it means that now the 12-period EMA moves higher than the 26-period EMA, which most likely means a bull trend therefore we ENTER our position.
When the MACD line cross under the zero line it means that the 12-period EMA moves lower than the 26-period EMA, indicating a bear trend therefore we EXIT our position.

The fact that we use weekly charts makes the MACD crossovers usable, otherwise there would be a lot of noise, even more than the simple crossover strategy we explored earlier.

### Cross symbol strategy

Doing any technical analysis and signal detection on QQQ3 directly leads to noise and false positives, both for entries and exits, because each movement is significant.

We concluded that in this situation it's better to use a less volatile symbol for detecting the signals, and use the more volatile but highly correlated symbol for the trade execution.

For example, the QQQ3 is the more volatile sibling of QQQ, so we detect signals on QQQ and execute on QQQ3.

Stop losses (see below) are calculated on the traded symbol, though, for proper risk management.

## Risk management with stop losses

Every **successful** professional trader and investor will tell you that the most important trait a trader should have is managing risks and sizing their positions appropriately.

There is an amazing talk by Dr. David Paul [The Consistently Winning Trader Psychology](https://youtu.be/xbbmqRC_M0o?si=_IXThkwv43EQPOt9&t=388) where he explains, among other things, how to size your trades based on their risk.

Long story short, wisdom says you shouldn't "bet or risk" more than 1-3% of your tradeable account value in each trade.

So, if the account has 100,000 USD, each trade should not risk losing more than 1-3K.
What you choose exactly depends on your risk appetite and how confident you feel about your trades, so let's settle on a 2% bet.

Note that the 2% bet, or 2K USD, is NOT the amount we should trade, it's the max we could lose.
The total amount of the trade depends on the strategy.

In my strategy I use a hard stop loss from the entry price at 10% (or 15% depending on how volatile is the traded symbol), so the total position I should enter comes out to 20K USD.

```
Position = AccountValue * RiskBet% / StopLoss%
=> 100_000 * 0.02 / 0.10
=> 20_000
```

The Nasdaq 100 makes moves larger than 10% regularly, and since we use 3x leveraged ETFs it means that a 3.4% movement from QQQ would instantly trigger our stop loss leading to false exits.

Therefore, the strategy uses dynamic stop losses on the way up.
The stop loss from the entry price is a hard rule, and nothing overrides it.

However, during a bull trend, we use a trailing stop loss from the peak highs and allow up to 30% of drawdown, extended with some volatility buffer (fixed or ATR-based).
This allows the 3x leveraged movements to have enough wiggle room to dip and then go up again, which is crucial to avoid false exits.

Concretely, the stop loss calculation is something like this:
```
stopLossPct = 10
stopLossDynamicPct = 30
bufferPct = 2

stopLossEntryPrice = entry_price * (1-stopLossPct/100)
dynamicStopLoss = highestClose * (1-stopLossDynamicPct/100) * (1-bufferPct/100)
activeStopLoss = math.max(stopLossEntryPrice, dynamicStopLoss)

shouldExitStopLoss = signalClose < activeStopLoss
```

Experienced folks will say that using leveraged ETFs is dangerous since they can move more than 30% in a single week.

Indeed, in theory this can happen.
There is an optional escape hatch for emergency exits that I monitor manually.
If the daily close price is lower than the calculated stop loss, then we can exit our position.

Better to lose some profits in case it was a false exit that recovers the next day, instead of not being able to sleep at night.
We can always re-enter the position if it's going up (see below).

### Re-entry after a stop loss trigger

There are two main rules for an entering a position:

1. MACD line crosses over the zero line.
2. MACD line crosses over the Signal line, used only when the MACD line is above the zero line.

The first rule is used after we exit because of a bear market where the MACD line crossed under the zero line.

The second rule is used after we exited due to a stop loss while the MACD line is still above the zero line.
This can happen when there are big drops but the market recovers before crossing under the zero line.

The benefit of the MACD-based strategy over the SMA-based strategy is that eventually the MACD line always crosses the MACD Signal line, even if they stay above the zero line.
Prices do not always go up, at some point they will stabilise and the MACD line converges with the Signal line, leading to a crossover.

This allows us to use stop losses and protect ourselves.

## Tricks and tweaks

The strategy also incorporates a few tweaks and tricks that become possible due to the fact we use different symbols for signal and execution, further optimizing our entries and exits to avoid false positives.

As we will see later in the [backtesting section](#backtesting), this same strategy can be used with company stocks as well, like AVGO (Broadcom) or SMT (Scottish Mortgage Trust).
The main requirement is that **these stocks are very highly correlated with the signal symbol**, in this case Nasdaq 100 (which is configurable too).

I won't go into details for these tweaks but just to give a glimpse:
- Relative strength. When entering a position the target symbol (QQQ3, AVGO) has to be trending upwards faster than the signal symbol (QQQ).
- Rising or Falling. When entering or exiting a position the target symbol must be in the appropriate trend as well for N consecutive weeks. For example, enter only once there are 2 rising bars.
- Buffer around the exit level to avoid false exits and whipsaws (sudden move down, then immediately up).
- For the MACD Signal line calculation I use a 5-period EMA instead of 9-period EMA. Falls into the overfitting category, I admit, but it does give a slight edge to some trades recovering faster from dip drawdowns, without any drawback. You can use the 9-period EMA, though, and the overall results will be similar.
- ... few more.

All of the above are configurable and optional.

Keep in mind that these tricks can be incorporated in any strategy, even the 200-daily/40-weekly SMA crossover strategy.
I did actually implement most of these for that strategy too, but the MACD-based strategy is still overall better.

## Backtesting

OK, let's see some numbers!

- **All charts below are logarithmic scale**, so that the past dips are not miniscule.
- Click each image to see it in full size.

**Chart legend**

The screenshots below have a panel for the active strategy right below the chart itself.

The strategy panel has certain icons that is worth knowing what they mean:
- Green triangle: All conditions are met for an entry.
- Red triangle: All conditions are met for an exit.
- Red flag above red triangle: Exit triggerred because of a stop loss.
- White cross overlay the red triangle: The trade ended up losing money.
- Yellow triangle: MACD line crosses below the exit level, but we are waiting for the confirmation filters.

### QQQ3 with QQQ signal

- Dates: 2012-12-01 to 2025-07-31
- Configuration: `BufferPct=2%`
- **Results: +10,981% PROFIT**

![Screenshot from trading view QQQ3/QQQ with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-qqq.png)

And the individual trades.

![Screenshot from trading view QQQ3/QQQ with the list of trades](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-qqq-trades.png)

And this is how the 40-week SMA crossover strategy would behave when using NDX as the signal symbol (with the 2% exit buffer too). **+2,800% PROFIT**

![Screenshot from trading view QQQ3 40-week SMA crossover](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-40w-sma-crossover-vs-ndx.png)

Using the QQQ3 as signal with the 40-week SMA crossover strategy returns **+2,300% PROFIT**.

### QQQ3 with NDX signal

- Dates: 2012-12-01 to 2025-07-31
- Configuration: `BufferPct=2%`
- **Results: +12,698% PROFIT**

[NDX](https://www.nasdaq.com/market-activity/index/ndx) is the Nasdaq 100 index itself, whereas QQQ is an ETF tracking the index.
As you see the performance is almost identical to the one using QQQ as signal, just a single trade in 2016 moves a bit earlier when using NDX as the signal symbol leading to a bit of extra profit.

![Screenshot from trading view QQQ3/NDX with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-ndx.png)

These small differences are insignificant at the grand scheme of things, and focusing too much on these just leads to overfitting the strategy which can lead to bad results in the future.

### TQQQ with QQQ signal

TQQQ is the US version of QQQ3, and the strategy works nicely as well.

- Dates: 2010-02-08 to 2025-07-31
- Configuration: `BufferPct=2%, ConsecutiveEnterConditions=2`
- **Results: +11,194% PROFIT**

![Screenshot from trading view TQQQ/QQQ with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/qqq3-vs-qqq.png)

And the individual trades.

![Screenshot from trading view TQQQ/QQQ with the list of trades](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/tqqq-vs-qqq-trades.png)

### Scottish Mortgage Trust (SMT) with QQQ signal

[Scottish Mortgage Trust](https://www.scottishmortgage.com/en/uk/individual-investors/holdings) is a growth focused trust in the UK, which I usually invest in for global growth exposure.

Here we also use the relative strength filter as entry confirmation, since occasionally QQQ will be trending upwards while SMT downwards, and that is not a good time to enter.

In this case, we can see the strategy working throughout the crashes of the past 25 years, including the dotcom bubble in 2000, the crash of 2008, COVID crash in 2020, and the longer crash in 2022.

- Dates: 1995-07-24 to 2025-07-31
- Configuration: `BufferPct=2%, RelativeStrengthBars=1`
- **Results: +1,305% PROFIT**

![Screenshot from trading view SMT/NDX with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/smt-vs-ndx.png)

The purple chart (3rd top to bottom) shows the relative strength of SMT against the Nasdaq 100 Index (NDX).
When the line is purple SMT is weaker, therefore it does not enter a position (see the green triangles until mid-2001), and when the line is blue SMT is stronger than NDX and positions can be entered.

### AVGO with QQQ signal

- Dates: 2009-08-03 to 2025-07-31
- Configuration: `BufferPct=2%`
- **Results: +6,000% PROFIT** (Note the 100% win rate!)

![Screenshot from trading view AVGO/QQQ with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/avgo-vs-qqq.png)

And with NDX instead of QQQ! **+6,159% PROFIT**

![Screenshot from trading view AVGO/NDX with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/avgo-vs-ndx.png)

### UPRO with SPX

- Dates: 2010-06-01 to 2025-07-31
- Configuration: `BufferPct=2%, EntryStopLoss=15%, DynamicStopLoss=30%`
- **Results: +1,700% PROFIT**

[UPRO](https://www.proshares.com/our-etfs/leveraged-and-inverse/upro) is the 3x daily leveraged ETF of the S&P 500 index, and [SPX](https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview) is the S&P 500 Index.

![Screenshot from trading view UPRO/SPX with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/upro-vs-spx.png)

The 40-week SMA crossover strategy with the 2% exit buffer would return **+1,100% PROFIT** and when using the SPX as signal **+2,000% PROFIT**.

![Screenshot from trading view UPRO/SPY 40W-based with the chart, the strategy panel, and the strategy tester](https://flare.lambrospetrou.com/articles-data/2025-08-18-investing-leveraged-qqq-macd/upro-40w-sma-crossover.png)

## Open questions

The one question I am still researching and backtesting is how to add more money into an existing position.

Everything is mechanical around entering a position and exiting a position, but considering that some periods span multiple years I need a robust way to add more money into the position even if just a few times per year, without negatively impacting our risk management.

## Conclusion

This is super fun, isn't it.😉

I suggest you read the publication ["Leverage for the Long Run - A Systematic Approach to Managing Risk and Magnifying Returns in Stocks"](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2741701) to see the impact of having a strategy to manage risk and reduce drawdowns while also taking advantage of leverage to magnify profits.

The basis of my strategy, and any strategy using the leveraged ETFs, is that the bull markets happen regularly and they are big enough to offset the losses from bear markets when managed properly.

If you have better ideas or improvements to my strategy, feel free to reach out on [@lambrospetrou](https://x.com/LambrosPetrou) or email me.

## Changelog

- 2025-08-18: Initial public post.
- 2025-08-17: Initial draft, not publicly listed.
