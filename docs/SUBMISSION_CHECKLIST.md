# Final submission checklist

## Implemented locally

- Seven connected pages and consistent responsive styles.
- Light/Dark theme saved across refresh and page navigation.
- Validated demo sign-in, persistent user interface and sign-out.
- Six FAQ questions with jQuery slideToggle and plus/minus indicators.
- Kitsu API search, format selection, JSON processing, dynamic cards and error handling.
- Group report, original contribution records, proposed defence roles.
- Watchlist persistence and safe text rendering.

## Before submission

1. Add actual website screenshots to the Word report: Home/FAQ, dark and light themes, signed-in header, Discover results, and mobile layout. Screen capture became unavailable during final preparation; screenshots have not been inserted.
2. Confirm the team's actual final work division in the report. Suggested roles are not claims that members performed unverified work.
3. Check the LMS deadline. All Git commits must be before it.
4. Push the final source to the existing repository and check GitHub Pages. The final files have not been pushed or deployed yet.
5. Test the API on the deployed origin. Live HTTP 200 and browser CORS were verified locally; the final API UI still needs a complete browser check after the provider change.
6. Each member submits both links individually in LMS.

## Repeat code checks

If Node.js is installed, run `node tests/final.cjs` from the project folder. The test uses a recorded live Kitsu response and verifies rendering, saved theme/user state, caching, empty results and errors without making network requests.
