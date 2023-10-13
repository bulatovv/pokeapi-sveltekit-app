
<script>
    import PaginationButton from './PaginationButton.svelte';
    import PaginationSeparator from './PaginationSeparator.svelte';
    import PaginationPrevious from './PaginationPrevious.svelte';
    import PaginationNext from './PaginationNext.svelte';
    import { range } from '$lib/utils';
    
    export let totalPages;
    export let page;        

</script>

<div class="select-none {$$restProps.class}">
    {#if totalPages != 1}
        <PaginationPrevious bind:page={page} />
    {/if}

    {#if totalPages < 10}
        {#each range(1, totalPages) as i}
            <PaginationButton num={i} bind:page={page} />
        {/each}
    {:else if page < 10}
        {#each range(1, 10) as i}
            <PaginationButton num={i} bind:page={page} />
        {/each}
        <PaginationSeparator />
        {#each range(totalPages - 2, totalPages) as i }
            <PaginationButton num={i} bind:page={page} />
        {/each}
    {:else if page > totalPages - 10}
        {#each range(1, 2) as i}
            <PaginationButton num={i} bind:page={page} />
        {/each}
        <PaginationSeparator />
        {#each range(totalPages - 10, totalPages) as i }
            <PaginationButton num={i} bind:page={page} />
        {/each}
    {:else}
        {#each range(1, 2) as i}
            <PaginationButton num={i} bind:page={page} />
        {/each}
        <PaginationSeparator />
        {#each range(page - 2, page + 2) as i }
            <PaginationButton num={i} bind:page={page} />
        {/each}
        <PaginationSeparator />
        {#each range(totalPages - 2, totalPages) as i }
            <PaginationButton num={i} bind:page={page} />
        {/each}
    {/if}


    {#if totalPages != 1}
        <PaginationNext totalPages={totalPages} bind:page={page} />
    {/if}
</div>
