<template>
    <div class="notes-item"
        :class="isActive ? 'notes-item_active' : ''"
    >
        <h3>{{ note.title }}</h3>
        <div>
            <span class="notes-item__date">{{ getDate(note.date) }}</span>
            <span class="notes-item__content">{{ formattedContent }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  note: { type: Object, required: true },
  isActive: Boolean,
})

const PLACEHOLDER = 'No additional text';

const getDate = (ms: number) => {
    const date = new Date(ms);
    return `${date.getHours()} : ${date.getMinutes()}`;
}

const formattedContent: ComputedRef<string> = computed(() => {
    const content = useConvertHTMLToText(props.note.content) || PLACEHOLDER;
    return useTruncateString(content);
})

</script>

<style lang="scss">

.notes-item {
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    border-bottom: $primary-border;

    &_active {
        background-color: $secondary;
        color: White;
    }

    &__date {
        font-weight: bold;
        margin-right:10px;
    }

    &__content {
        font-style: italic;
        display: inline-block;
    }

    h3 {
        margin-bottom: 0;
        margin-top: 0;
    }

    p {
        margin: 5px 0;
    }
}

</style>