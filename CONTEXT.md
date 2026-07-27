# InsidePSBS

The mobile app for the student community of the two schools sharing the campus — Télécom Physique Strasbourg and the École Supérieure de Biotechnologie de Strasbourg, together "PSBS". It is a client of the existing its-tps API — the API is the source of truth for the domain, and this glossary names what it models.

## Language

### Content

**Post**:
A piece of published content authored to the community, carrying a rich-text body, media, reactions and comments. May reference an Event.
_Avoid_: Article, publication, feed item

**Event**:
Something scheduled, with a title, a location and a start and end. May reference a Post. An Event is not a Post and carries no body, media, reactions or comments.
_Avoid_: Activity, happening

Post and Event are separate first-class terms joined by an optional one-to-one link; either may exist without the other. One create submission may produce a Post, an Event, or both.

**Feed**:
The community-wide stream of Posts, newest first, optionally narrowed to a single Category or a search term.
_Avoid_: Timeline, posts list, wall

**Published At**:
The moment a Post enters the Feed, which is the time shown to readers. Distinct from when the record was created, so a Post may be published later than it was written.
_Avoid_: Uploaded at, created at, posted at
_API_: `uploaded_at`

**Category**:
A topical label attached to a Post or an Event, carrying a colour and an emoji. Only some Categories are offered as Feed filters.
_Avoid_: Tag, filter, topic

**Media**:
An image or video attached to a Post.
_Avoid_: Attachment, asset

### Campus life

**Menu**:
What the CROUS university restaurant is serving on a given day. Sourced from the CROUS, not from the its-tps API.
_Avoid_: RU menu, canteen menu

**MPS**:
Média Physique Strasbourg, the student media Organization. Its photographs live outside the app, on a Nextcloud share the app links out to.

### Engagement

**Comment**:
A User's written response to a Post.

**Reply**:
A written response to a Comment. Replies do not nest: a response to a Reply belongs to the same thread as the Reply it answers.

**Reaction**:
A User's single chosen response to a Post or a Comment, drawn from a fixed palette. A User has at most one per item.
_Avoid_: Like, vote, emoji

**Reaction Type**:
One entry in the palette of Reactions available to choose from.

### Attribution

**Author**:
The signed-in identity that published a Post, Event or Comment — either a User or an Organization. Organizations sign in as themselves rather than posting through one of their Members.
_Avoid_: Poster, creator, owner

**Own**:
A Post or Comment is *own* when the reader is signed in as its Author, which is what permits deleting it. An Organization's content is own only to whoever is signed in as that Organization, never to its Members.
_Avoid_: Mine, self-authored

### People

**User**:
A person in the community. The same term whether it is the reader or someone else; only the fields the API discloses differ.
_Avoid_: Account, member (as a synonym for person)

**Profile**:
The presentable view of a User — their identity, description and authored Posts.

**Track**:
The specialisation a User follows in their studies.
_Avoid_: Sector, filière, major
_API_: `sector` / `sector_id`

**Intake Year**:
The year a User was admitted to the school.
_Avoid_: Admission year, promo, class
_API_: `admission_year`

**Organization Page**:
The presentable view of an Organization, carrying its description, social links and Members. Deliberately not called a Profile, which belongs to people.

### Community

**Association**:
A legally constituted student body (loi 1901) with its own statutes, bureau and finances.

**Club**:
An informal student group with no separate legal existence, operating under an Association or the BDE.

**Organization**:
An Association or a Club, used only where the two are interchangeable — as an Author, or as an entry in the organizations list.
_Avoid_: Group, society

**BDE**:
The student union — one particular Association, under which many Clubs operate. It holds no special structural position in the app.

**Member**:
A User belonging to an Organization, holding a role there. Membership is descriptive only — it grants no rights over the Organization's content, which belongs to the Organization's own sign-in.

### Fouaille

**Fouaille**:
The student bar and shop. Kept in French: it is the name of a real place, and the rule about anglicising API terms applies to translated common nouns, not to proper nouns.

**Card**:
A User's prepaid means of paying at the Fouaille, identified by NFC and carrying a Balance.

**Balance**:
The money remaining on a Card.

**Order**:
A single purchase at the Fouaille — a Product, a quantity, a total, and the Balance left afterwards.

**Product**:
Something sold at the Fouaille, with a name, a type and a unit price.

