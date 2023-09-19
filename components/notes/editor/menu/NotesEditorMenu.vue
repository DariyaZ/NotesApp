<template>
    <div v-if="editor" class="notes-buttons">
        <button @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
        >
            bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
        >
            italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
        >
            strike
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
        >
            bullet list
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
        >
            ordered list
        </button>
        <button @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }"
        >
            blockquote
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
            horizontal rule
        </button>
        <button @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
        >
            undo
        </button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['editor']);

</script>

<style lang="scss">
    .notes-buttons {
        margin-bottom: 10px;
        margin-top: 15px;

        button {
            min-height: 30px;
            background-color: $primary;
            border-radius: 5px;
            margin-right: 5px;
            border: $primary-border;
            color: $dark-blue;
            font-weight: bold;
            padding: 0 10px;
            margin-bottom: 10px;
        }

        .is-active {
            background-color: $secondary;
            color: white;
        }
    }
</style>