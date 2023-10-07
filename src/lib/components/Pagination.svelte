
<script>
    import PaginationButton from '$lib/components/PaginationButton.svelte';
    import { range } from '$lib/utils';
    
    export let totalPages;
    export let page;
        

</script>



{#each range(1, totalPages) as i}
    <PaginationButton num={i} bind:page={page} />

{/each}
