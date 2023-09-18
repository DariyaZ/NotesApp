<template>
    <div class="notes-editor">
        <div v-if="editor">
            <NotesEditorMenu :editor="editor" />
        </div>
        <editor-content :editor="editor" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import { NoteInterface } from '@/utils/interfaces';

import idb from '@/api/notes';

import { debounce } from "lodash";

const SAVE_NOTE_DEBOUNCE_MS: number = 1500;

const props = defineProps({
  note: NoteInterface,
  editingMode: Boolean,
})

const emit = defineEmits(['getNotes']);

const editor = useEditor({
  content: props.note.content,
  editable: false,
  editorProps: {
    attributes: {
      class: 'notes-editor__content',
    },
  },
  extensions: [
    StarterKit,
  ],
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    updateNote(html);
  },
})

const updateNote = debounce(
    async (html) => {
        await idb.saveNote({...props.note, content: html});
        await emit('getNotes');
    },
    SAVE_NOTE_DEBOUNCE_MS
)

const setEditorContent = () => {
    editor.value.setContent(props.notes.content);
}

watch(() => props.editingMode, (newMode, oldMode) => {
    if (newMode) {
        editor.value.setEditable(true);
        editor.value.chain().focus();
    }
})

watch(() => props.note, (newNote, oldNote) => {
    editor.value.commands.setContent(newNote.content);
})

</script>

<style lang="scss">
.notes-editor {
    padding: 10px;

    &__content {
        padding: 10px;
        border: 1px solid $primary;
        border-radius: 15px;
        height: 85vh;
    }
}

</style>