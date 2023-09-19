<template>
	<div class="main-layout">
        <div class="main-layout__sidebar">
            <NotesList :notes="notesToDisplay"
                :activeNoteId="activeNoteId"
                @getNotes="getNotes"
                @updateActiveNoteId="updateActiveNoteId"
            />
        </div>

        <div class="main-layout__content">
            <NotesHeader
                :note="activeNote"
                @onSearch="onSearch"
                @onEdit="onEdit"
                @getNotes="getNotes"
            />
            <client-only>
                <NotesEditor :note="activeNote" :editingMode="editingMode" v-if="activeNote" @getNotes="getNotes" />
            </client-only>
        </div>
	</div>
</template>

<script setup lang="ts">
import idb from '@/api/notes';

import { NoteInterface } from '@/utils/interfaces';

const notes: Ref<NoteInterface[]> = ref([]);

const getNotes = async () => {
    const dbNotes = await idb.getNotes() as NoteInterface[];
    notes.value = useOrderBy(dbNotes, 'updated', 'desc');
}

onMounted(async () => {
    await getNotes();
    
    if (notes.value.length) {
        updateActiveNoteId(notes.value[0]?.id);
    }
});

const activeNoteId: Ref<number|null> = ref(null);

const activeNote: ComputedRef<NoteInterface | undefined> = computed(() => {
    return notes.value.find((note) => note.id == activeNoteId.value)
});

const updateActiveNoteId = (id: number) => {
    activeNoteId.value = id;
    editingMode.value = false;
}

const searchQuery: Ref<string> = ref('');

const onSearch = (query: Ref<string>) => {
    searchQuery.value = query.value;
    updateActiveNoteId(notesToDisplay.value[0]?.id);
}

const filteredNotes = computed(() => {
    return notes.value.filter((note) => note.content.includes(searchQuery.value))
});

const notesToDisplay = computed(() => filteredNotes.value.length ? filteredNotes.value : notes.value);

const editingMode: Ref<boolean> = ref(false);

const onEdit = () => {
    editingMode.value = true;
}

</script>

<style lang="scss">
    .main-layout {
        display: flex;
        min-height: 100vh;

        &__sidebar {
            width: 25%;
            border-right: 1px solid $primary;
        }

        &__content {
            width: 75%;
        }

        @media screen and (max-width: 769px) {
            flex-direction: column;

            &__sidebar {
                width: 100%;
                border-right: none;
            }

            &__content {
                width: 100%;
            }
        }
    }
</style>