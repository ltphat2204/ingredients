<script setup>
const props = defineProps(['options', 'selectedOption', 'name']);
const emit = defineEmits(['update:selectedOption']);
</script>

<template>
    <div>
      <select :id="props.name" :name="props.name" class="outline-none bg-rose-900 text-rose-50 hover:bg-rose-300 px-4 py-2 rounded" :value="props.selectedOption" @change="val => emit('update:selectedOption', val.target.value)">
        <option class="bg-rose-900" v-for="option in props.options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
</template>