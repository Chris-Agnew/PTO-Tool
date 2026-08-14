# PTO Tracker

Paid time off tracking for a ~50 person company: request intake, approval, balance calculation, and calendar entries.

## The problem

PTO was being tracked by hand. Requests came in over email, balances lived in someone's spreadsheet, and nobody could see who was off next week without asking.

The first version I built solved that in Google Apps Script: a Google Form for intake, automatic approval and time calculation, a confirmation email showing the requester's remaining balance, and an entry written to the company Google Calendar. Balances were tracked in a pivot table. It ran for about 50 employees.

## Why it was rebuilt

The spreadsheet model held up until the end of the year.

Rolling balances across the year boundary turned out to be something the sheet fundamentally couldn't do cleanly. Accrual, carryover, and the distinction between time earned in one year and used in the next all needed real data modeling, not formulas layered on formulas.

This repo is that rebuild: TypeScript, Next.js, and Firebase, with the balance logic in code and the records in Firestore instead of cells.

## What it does

- Google sign-in via Firebase Auth
- Request submission with automatic time calculation
- Running balance per employee
- Dashboard views for individual and company-wide time off
- Calendar view of scheduled time off
- Handles a four-day work week, so a day of PTO isn't assumed to be eight hours

That last one is the part that made the logic non-trivial. Most PTO math assumes a five-day, forty-hour week. Once the work week changes shape, every conversion between days, hours, and balances has to be explicit.

## Stack

TypeScript · Next.js · Tailwind · Firebase (Auth + Firestore)

## Status

Built for a previous employer. No longer in use, and kept here as a reference(with authorization). Configuration is via environment variables; see `.env.example`.

---

[chris-agnew.com](https://www.chris-agnew.com/) · [LinkedIn](https://www.linkedin.com/in/chris-agnew12/)
