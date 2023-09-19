<template>
    <div class="editor-header">
        <Icon name="material-symbols:box-edit-outline" color="grey" size="25" @click="editNote()" />

        <input v-model="searchQuery"
            @input="search()"
            :placeholder="SEARCH_PLACEHOLDER"
        >
    </div>
</template>

<script setup lang="ts">
import { debounce } from "lodash";

import idb from '@/api/notes';

const props = defineProps({
  note: Object,
})

const SEARCH_PLACEHOLDER = 'Search';
const SEARCH_DEBOUNCE_MS = 1000;

const searchQuery: Ref<string> = ref('');

const emit = defineEmits(['onSearch', 'onEdit']);

const search = debounce(
    () => {
        emit('onSearch', searchQuery);
    },
    SEARCH_DEBOUNCE_MS
);

const editNote = async () => {
    await emit('onEdit');
}

</script>

<style lang="scss">
.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    @media screen and (max-width: 480px) {
        input {
            width: 70%;
        }
    }
}
</style>