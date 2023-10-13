<script>
    export let page;
</script>
<button 
    class="inline-block bg-gray-100 rounded-lg p-2 m-1 shadow-md"
    on:click={() => page--}
    disabled={page == 1}
    class:opacity-50={page == 1}>
    &#8592;
</button>
