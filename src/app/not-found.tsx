import SiteLayout from "./(site)/layout";
import NotFound from "./(site)/not-found";

export { metadata } from "./(site)/not-found";

/** 404 for URLs that match no route; reuses the site chrome and message. */
export default function GlobalNotFound() {
  return (
    <SiteLayout params={Promise.resolve({})}>
      <NotFound />
    </SiteLayout>
  );
}
