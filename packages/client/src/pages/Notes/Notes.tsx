import { useEffect, useRef, type ChangeEvent, type FC } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notesQueryPaged } from "@vw-digital-hub/api";
import { NoteCard } from "../../components/NoteCard/NoteCard";
import { useDeleteNote } from "../../components/modals/DeleteNote/DeleteNote.hooks";
import { useNavigate, useSearchParams } from "react-router";
import {
  NOTE_CARD_WIDTH,
  SearchInput,
  InfiniteScroll,
  StyledLoading,
} from "@vw-digital-hub/design-system";
import { useDebouncedCallback } from "use-debounce";
import { useInView } from "react-intersection-observer";
import { getEditNoteRoute, getViewNoteRoute } from "../../Router/Router.utils";

const QUERY_PARAM = "query";
const PAGE_SIZE = 10;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Cards = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${NOTE_CARD_WIDTH}px, max-content)
  );
  justify-content: space-evenly;
  align-items: center;
  overflow: auto;
  padding-bottom: 30px;
`;

const StyledInfiniteScrollIndicator = styled(InfiniteScroll)`
  grid-column-start: 1;
  grid-column-end: -1;
`;

export const Notes: FC = () => {
  const searchInputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addDeleteNote } = useDeleteNote();
  const navigate = useNavigate();
  const { ref, inView } = useInView({});
  const {
    data: notes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(notesQueryPaged(PAGE_SIZE));

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const onSeachChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;

      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set(QUERY_PARAM, query);
      } else {
        params.delete(QUERY_PARAM);
      }
      setSearchParams(params);
    },
    300
  );

  const filteredNotes = notes?.pages
    .flatMap((page) => page)
    .filter((note) =>
      note.title
        .toLowerCase()
        .includes((searchParams.get(QUERY_PARAM) ?? "").toLowerCase())
    );

  return (
    <Container>
      <SearchInput
        aria-label="search"
        onChange={onSeachChange}
        ref={searchInputRef}
        defaultValue={searchParams.get(QUERY_PARAM)?.toString()}
      />
      <Cards>
        {filteredNotes &&
          filteredNotes.map((note) => (
            <NoteCard
              to={getViewNoteRoute(note.id)}
              key={note.id}
              onEditClick={() => {
                navigate(getEditNoteRoute(note.id));
              }}
              onDeleteClick={() => {
                addDeleteNote(note.id);
              }}
              {...note}
            />
          ))}
        {isFetchingNextPage && <StyledLoading />}
        {hasNextPage && !isFetchingNextPage && (
          <StyledInfiniteScrollIndicator ref={ref} />
        )}
      </Cards>
    </Container>
  );
};
