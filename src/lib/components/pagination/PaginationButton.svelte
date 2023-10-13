<script>

    export let page;
    export let num;

</script>



<input 
    type="radio" 
    name="page" 
    id="page-{num}" 
    value="{num}" 
    bind:group={page} 
    class="hidden" />
<label
    for="page-{num}"
    class="inline-block rounded-lg p-2 m-1 shadow-md cursor-pointer"
    class:bg-gray-100={page != num}
    class:bg-blue-200={page == num}>
    {num}
</label>
