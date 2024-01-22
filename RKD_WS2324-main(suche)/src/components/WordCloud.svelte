<!-- WordCloud.svelte -->

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import d3Cloud from 'd3-cloud';

    let mainTopics = {};
    let wordLinks = {};

    onMount(() => {
        Promise.all([
            d3.csv('/limited_values.csv'),
            d3.csv('/links.csv')
        ]).then(([wordsData, linksData]) => {
            mainTopics = wordsData.reduce((acc, row) => {
                acc[row.word] = +row.Count; // Assuming columns 'Neue Version' and 'count'
                return acc;
            }, {});

            wordLinks = linksData.reduce((acc, row) => {
                acc[row.Word] = row.URL; // Assuming columns 'word' and 'url'
                return acc;
            }, {});

            drawMainTopics();
        });
    });

    function drawWordCloud(words) {
        d3.select("#wordcloud").selectAll("*").remove();

        let layout = d3Cloud()
            .size([800, 600])
            .words(words.map(d => ({ text: d.text, size: Math.max(10, Math.min(d.size * 2, 60)) })))
            .padding(5)
            .rotate(0)
            .font("Impact")
            .fontSize(d => d.size)
            .on("end", draw);

        layout.start();

        function draw(words) {
            let svg = d3.select("#wordcloud").append("svg")
                .attr("width", layout.size()[0])
                .attr("height", layout.size()[1]);

            svg.append("g")
                .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", d => `${d.size}px`)
                .style("font-family", "Impact")
                .attr("text-anchor", "middle")
                .attr("transform", d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text(d => d.text)
                .on("click", d => {
                    if (wordLinks[d.text]) {
                        window.location.href = wordLinks[d.text];
                    }
                });
        }
    }

    function drawMainTopics() {
        let mainWords = Object.keys(mainTopics).map(key => ({ text: key, size: mainTopics[key] }));
        drawWordCloud(mainWords);
    }
</script>

<style>
    #wordcloud {
        width: 100%;
        height: 600px;
        position: relative;
    }
    .word {
        cursor: pointer;
    }
</style>

<div id="wordcloud"></div>
