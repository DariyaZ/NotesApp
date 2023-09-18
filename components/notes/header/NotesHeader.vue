<template>
    <div class="editor-header">
        <Icon name="material-symbols:box-edit-outline" color="grey" size="25" @click="editNote()" />

        <input class="editor-header__search"
            v-model="searchQuery"
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
    padding: 10px;

    &__search {
        min-height: 30px;
        border: 1px solid $primary;
        border-radius: 10px;
        padding: 0 10px;

        &:focus {
            outline: none;
        }
    }
}
</style>