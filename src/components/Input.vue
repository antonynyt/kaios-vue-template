<template>
    <div class="input">
        <input ref="input" type="text" @keydown.enter="onEnter" v-model="value" :nav-selectable="true" />
        <label>{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: "Input",
    props: {
        label: {
            type: String,
            required: true
        }
    },
    data: () => ({ value: "" }),
    methods: {
        onEnter() {
            const isFocused = this.$refs.input.getAttribute('nav-selected');
            if (!this.value.length || !isFocused) return;
            this.$emit("onEnter", this.value);
            this.value = "";
        }
    }
};
</script>

<style scoped>
.input {
    display: flex;
    flex-direction: column;
    margin: 5px 10px;
    position: relative;
    padding-top: 7px;
}

.input input {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #d2d2d2;
    outline: 0;
    font-size: 16px;
    color: transparent;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}

.input label {
    position: absolute;
    bottom: 0;
    color: #9b9b9b;
}

.input input::placeholder {
    color: transparent;
}

.input input:placeholder-shown~label {
    font-size: 16px;
    cursor: text;
    top: 20px;
}

.input input[nav-selected="true"]~label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
    color: #9b9b9b;
}

.input input[nav-selected="true"]~label {
    color: #9b27af;
}

.input input[nav-selected="true"] {
    padding-bottom: 6px;
    border-bottom: 2px solid #9b27af;
    text-shadow: 0 0 0 rgba(0, 0, 0, 1);
}
</style>