<template>
    <div class="notes-list">
        <div class="notes-list__header">
            <Icon name="material-symbols:add-circle-outline" color="grey" size="25" @click="addNote(EMPTY_NOTE)" />
            <button @click="deleteNote(activeNoteId)" :disabled="!activeNoteId">
                <Icon name="material-symbols:delete-outline" color="grey" size="25" />
            </button>
        </div>

        <div v-for="note in notes"
            :key="note.id"
            @click="selectNote(note)"
        >
            <NotesItem :is-active="activeNoteId === note.id" :note="note" />
        </div>
    </div>
</template>

<script setup lang="ts">

import idb from '@/api/notes';

import { NoteInterface } from '@/utils/interfaces';

const EMPTY_NOTE: NoteInterface = {
    date: Date.now(),
    title: 'New Note',
    content: ''
}

const props = defineProps({
  notes: Array<NoteInterface>,
  activeNoteId: Number,
})

const emit = defineEmits(['getNotes', 'updateActiveNoteId']);

const addNote = async (note: NoteInterface) => {
    await idb.saveNote({...note});
    await emit('getNotes');

    setTimeout(() => {
        emit('updateActiveNoteId', props.notes[0]?.id);
    }, 200)
}


const selectNote = (note: NoteInterface) => {
    emit('updateActiveNoteId', note.id);
}

const deleteNote = async (id: number | undefined) => {
    await idb.deleteNote(id);
    emit('getNotes');

    setTimeout(() => {
        emit('updateActiveNoteId', props.notes[0]?.id);
    }, 200)
}

</script>

<style lang="scss">

.notes-list {
    padding: 10px;

    &__header {
        margin-bottom: 20px;
        padding-left: 20px;

        svg {
            margin-right: 20px;
        }

        button {
            background-color: transparent;
            border: none;
        }
    }

    &__item {
        padding: 20px;
        border-radius: 15px;
        margin-bottom: 20px;

        &-active {
            background-color: $primary;
        }

        &_date {
            font-weight: bold;
            margin-right:10px;
        }

        &_content {
            font-style: italic;
        }

        h3 {
            margin-bottom: 0;
            margin-top: 0;
        }

        p {
            margin: 5px 0;
        }
    }
}

</style>