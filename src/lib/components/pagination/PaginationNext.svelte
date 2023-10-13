<script>
    export let page;
    export let totalPages;
</script>
<button 
    class="inline-block bg-gray-100 rounded-lg p-2 m-1 shadow-md"
    on:click={() => page++}
    disabled={page == totalPages}
    class:opacity-50={page == totalPages}>
    &#8594;
</button>
