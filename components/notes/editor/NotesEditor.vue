<template>
    <div class="notes-editor">
        <div v-if="editor && editingMode">
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

const SAVE_NOTE_DEBOUNCE_MS: number = 1000;

const props = defineProps({
  note: Object,
  editingMode: Boolean,
})

const emit = defineEmits(['getNotes']);

const editor = useEditor({
  content: props.note.content,
  editable: false,
  extensions: [
    StarterKit,
  ],
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    updateNote(html);
  },
})

const updateNote = useDebounce(
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
    editor.value.setEditable(newMode, false);

    if (newMode) {
        editor.value.chain().focus();
    }
})

watch(() => props.note, (newNote, oldNote) => {
    editor.value.commands.setContent(newNote.content);
})

</script>

<style lang="scss">
.notes-editor {
    padding: 10px 20px;

    .tiptap {
        border: none;
        outline: none;
        border-radius: 15px;
        height: 85vh;
        padding: 10px;

        @media screen and (max-width: 769px) {
            height: auto;
        }

        &.ProseMirror-focused {
            border: 1px solid $primary;
        }
    }
}

</style>