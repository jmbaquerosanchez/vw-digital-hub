import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { noteByIdQuery } from "@vw-digital-hub/api";
import { NoteEditor } from "../../../components/NoteEditor/NoteEditor";
import { StyledLoading } from "@vw-digital-hub/design-system";
import { getHomeRoute } from "../../../Router/Router.utils";

export const EditNote: FC = () => {
  const { noteId } = useParams();
  const { data: note, isError } = useQuery(noteByIdQuery(noteId));
  const navigate = useNavigate();

  if (isError) navigate(getHomeRoute());

  return (
    <>
      {!note && <StyledLoading />}
      {note && <NoteEditor note={note} />}
    </>
  );
};
