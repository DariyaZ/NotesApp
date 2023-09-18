<template>
	<div class="main-layout">
        <div class="main-layout__sidebar">
            <NotesList :notes="notes" :activeNoteId="activeNoteId" @getNotes="getNotes" @updateActiveNoteId="updateActiveNoteId"/>
        </div>
	</div>
</template>

<script setup lang="ts">
import idb from '@/api/notes';

import { NoteInterface } from '@/utils/interfaces';

const notes: Ref<NoteInterface[]> = ref([]);

const getNotes = async () => {
    const dbNotes = await idb.getNotes() as NoteInterface[];
    notes.value = dbNotes.reverse();

    if (notes.value.length) {
        updateActiveNoteId(notes.value[0]?.id);
    }
}

onMounted(getNotes);

const activeNoteId: Ref<number|null> = ref(null);

const updateActiveNoteId = (id: number) => {
    activeNoteId.value = id;
}

</script>

<style lang="scss">
    .main-layout {
        display: flex;
        min-height: 100vh;

        &__sidebar {
            width: 25%;
            border-right: 1px solid #e7eaf6;
        }

        &__content {
            width: 75%;
        }
    }
</style>