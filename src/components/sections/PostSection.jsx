import styled from "styled-components";
import SectionHeader from "../atoms/SectionHeader";
import PostCell from "../modules/PostCell";
import LinkButton from "../atoms/LinkButton";

const posts = [
  {
    title: "Upgraded to Gatsby v2",
    description: "This starter has been forked and upgraded to Gatsby v2",
    tags: ["gatsby", "typography"],
    published: "2022-12-27"
  },
  {
    title: "Humane Typography in the Digital Age",
    description: "An Essay on Typography by Eric Gill takes the reader back to the year 1930. The year when a conflict between two worlds came to its term. The machines of the industrial world finally took over the handicrafts.",
    tags: ["design culture", "typography"],
    published: "2022-09-27"
  },
  {
    title: "Johannes Gutenberg: The Birth of Movable Type",
    description: "German inventor Johannes Gutenberg developed a method of movable type and used it to create one of the western world’s first major printed books, the “Forty–Two–Line” Bible.",
    tags: ["gatsby"],
    published: "2022-07-01"
  },
  {
    title: "바지락 술찜 레시피",
    description: "바지락 냠냠, 화이트 와인 냠냠",
    tags: ["요리"],
    published: "2022-07-20"
  },
];

function MainSection() {
  return (
    <PostSectionContainer>
      <SectionHeader>
        latest
      </SectionHeader>
      <PostList>
        {posts.map(({ title, description, tags, published }) => (
          <PostCell
            title={title}
            description={description}
            tags={tags}
            published={published}
          />
        ))}
      </PostList>
      <PagenationConsole>
        <LinkButton
          href="/"
          size={9}
          color="blue"
        >
          &larr; Page 0
        </LinkButton>
        <LinkButton
          href="/"
          size={9}
          color="blue"
        >
          Page 2 &rarr;
        </LinkButton>
      </PagenationConsole>
    </PostSectionContainer>
  );
}

const PostSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40rem;
  padding: 0 3rem;
`;

const PostList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem 0;
`;

const PagenationConsole = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default MainSection;
