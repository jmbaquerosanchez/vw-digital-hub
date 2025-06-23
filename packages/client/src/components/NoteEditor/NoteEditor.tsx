import { useContext, useRef, useState, type FC } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SecondaryButton,
  TextField,
  TextAreaField,
  StyledLoading,
} from "@vw-digital-hub/design-system";
import {
  type Note,
  createNoteMutation,
  updateNoteMutation,
} from "@vw-digital-hub/api";
import { useToast } from "../Toast/Toast.hook";
import { LayoutContext } from "../Layout/Layout.context";
import type { Size } from "@vw-digital-hub/utils";

const Container = styled.form<{ $size: Size }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
  overflow: hidden;

  ${({ $size }) =>
    $size === "small"
      ? `
      gap: 20px;`
      : `
      justify-content: space-between;
      padding: 0 20px 20px 20px;
    `}
`;

const TextFieldsContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
`;

const Title = styled(TextField)`
  width: 100%;
  height: 10%;
`;

const Content = styled(TextAreaField)`
  width: 100%;
  height: 80%;
`;

interface Props {
  note: Note;
}

export const NoteEditor: FC<Props> = ({ note }) => {
  const { showToast } = useToast();
  const { size } = useContext(LayoutContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const queryClient = useQueryClient();
  const { isPending: isCreatePending, mutateAsync: mutateAsyncCreate } =
    useMutation(createNoteMutation(queryClient));
  const { isPending: isUpdatePending, mutateAsync: mutateAsyncUpdate } =
    useMutation(updateNoteMutation(queryClient));

  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");
  const [thereAreEmptyFields, setThereAreEmptyFields] = useState(true);

  const checkButtonState = () => {
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    if (title?.trim() && content?.trim()) {
      setThereAreEmptyFields(false);
    } else {
      setThereAreEmptyFields(true);
    }
  };

  const onTitleChange = () => {
    const title = titleRef.current?.value;
    checkButtonState();
    setTitle(title || "");
  };

  const onContentChange = () => {
    const content = contentRef.current?.value;
    checkButtonState();
    setContent(content || "");
  };

  const resetFields = () => {
    setTitle("");
    setContent("");
    setThereAreEmptyFields(true);
  };

  const onCreateSave = async () => {
    if (thereAreEmptyFields) return;

    try {
      await mutateAsyncCreate({ title, content });
      showToast("Note created successfully", "good");
      resetFields();
    } catch {
      showToast("Failed to create note", "bad");
    }
  };

  const onUpdateSave = async () => {
    if (thereAreEmptyFields) return;

    try {
      await mutateAsyncUpdate({ id: note.id, title, content });
      showToast("Note update successfully", "good");
    } catch {
      showToast(`Failed to update note with id: ${note.id}`, "bad");
    }
  };

  const isButtonDisabled =
    thereAreEmptyFields || isCreatePending || isUpdatePending;
  const buttonCallback = note.id ? onUpdateSave : onCreateSave;

  return (
    <Container
      $size={size}
      onSubmit={(e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
          buttonCallback();
        }
      }}
    >
      <TextFieldsContainer>
        <Title
          onChange={onTitleChange}
          label={"Write the title here"}
          required={true}
          ref={titleRef}
          value={title}
          aria-required
        />
        <Content
          onChange={onContentChange}
          label={"Write the note content here"}
          required={true}
          ref={contentRef}
          value={content}
          aria-required
        />
      </TextFieldsContainer>
      <SecondaryButton
        onClick={buttonCallback}
        disabled={isButtonDisabled}
        label="Save"
      />
      {(isCreatePending || isUpdatePending) && <StyledLoading />}
    </Container>
  );
};
