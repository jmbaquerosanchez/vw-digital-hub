import { useQuery } from "@tanstack/react-query";
import { useContext, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { LayoutContext } from "../../../components/Layout/Layout.context";
import type { Size } from "@vw-digital-hub/utils";
import { StyledLoading } from "@vw-digital-hub/design-system";
import { noteByIdQuery } from "@vw-digital-hub/api";
import { getHomeRoute } from "../../../Router/Router.utils";

const Container = styled.div<{ $size: Size }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  justify-items: flex-start;
  overflow: auto;

  ${({ $size }) =>
    $size === "small"
      ? `
      padding: 0 20px;
      gap: 20px;`
      : `
      padding: 10px 80px 0 80px;
      gap: 50px;
    `}

  & > h1 {
    ${({ $size }) =>
      $size === "small"
        ? `
      font: var(--hero-small);
      min-height: 26px;`
        : `
      font: var(--hero-big);
      min-height: 56px;
    `}
    text-align: left;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    font: var(--body-semibold);
    width: 100%;
  }
`;

export const ViewNote: FC = () => {
  const { noteId } = useParams();
  const { data: note, isError } = useQuery(noteByIdQuery(noteId));
  const navigate = useNavigate();
  const { size } = useContext(LayoutContext);

  if (isError) navigate(getHomeRoute());

  return (
    <Container $size={size}>
      {!note && <StyledLoading />}
      {note && (
        <>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </>
      )}
    </Container>
  );
};
