<template>
    <nav class="paginate">
        <a v-for="(link, index) in this.$store.state.links"
           :key="index"
           :class="{
               'paginate__span-prev': link.url === null && link.label != '...' && link.active === false && index === 0,
               'paginate__link-prev': link.url != null && link.label != '...' && link.active === false && index === 0,
               'paginate__link-active': link.url != null && link.label != '...' && link.active === true,
               'paginate__link': link.url != null && link.label != '...' && link.active === false && index != linksLength - 1,
               'paginate__dots': link.url === null && link.label === '...',
               'paginate__link-next': link.url != null && index === linksLength - 1,
               'paginate__span-next': link.url === null && index === linksLength - 1
           }"
           :disabled="(link.url === null && link.label != '...' && link.active === false && index === 0) ||
                     (link.url != null && link.label != '...' && link.active === true) ||
                     (link.url === null && link.label === '...') ||
                     (link.url === null && index === this.$store.state.links.length - 1)"
           @click="paging(link, index)"
           v-html="link.label"
        >
        </a>
    </nav>
</template>

<script>
export default {
    name: "linksPaginate",
    data: function () {
        return {
            //page: 1,
            linksLength: this.$store.state.links.length
        }
    },
    computed: {
        /*spanPrev() {
            if (link.url === null && link.label != '...' && link.active === false && index === 0) {
                return true;
            }
        },
        linkPrev() {
            if (link.url != null && link.label != '...' && link.active === false && index === 0) {
                return true;
            }
        },
        linkActive() {
            if (link.url != null && link.label != '...' && link.active === true) {
                return true;
            }
        },
        link() {
            if (link.url != null && link.label != '...' && link.active === false && index != links.length - 1) {
                return true
            }
        },
        dots() {
            if (link.url === null && link.label === '...') {
                return true;
            }
        },
        linkNext() {
            if (link.url != null && index === links.length - 1) {
                return true;
            }
        },
        spanNext() {
            if (link.url === null && index === links.length - 1) {
                return true;
            }
        }*/
    },
    methods: {
        /*htmlLinks() {
            let html, vm = this;
            this.$store.state.links.forEach(function (link, index, links) {
                if (link.url != null) {
                    vm.page = Number(new URL(link.url).searchParams.get('page'));
                }

                if (link.url === null && link.label != '...' && link.active === false && index === 0) {
                    html = `<div class="paginate"><span class="paginate__span-prev">${link.label}</span>`;
                } else if (link.url != null && link.label != '...' && link.active === false && index === 0) {
                    html = `<div class="paginate"><a href="" @click="paging(1)" class="paginate__link-prev">${link.label}</a>`;
                }

                if (link.url != null && link.label != '...' && link.active === true) {
                    html += `<span class="paginate__link-active">${link.label}</span>`;
                } else if (link.url != null && link.label != '...' && link.active === false && index != links.length - 1) {
                    html += `<a href="" class="paginate__link" @click="paging(1)">${link.label}</a>`;
                } else if (link.url === null && link.label === '...') {
                    html += `<span class="paginate__dots">${link.label}</span>`;
                }

                if (link.url != null && index === links.length - 1) {
                    html += `<a href="" class="paginate__link-next" @click="paging(1)">${link.label}</a></div>`;
                } else if (link.url === null && index === links.length - 1) {
                    html += `<span class="paginate__span-next">${link.label}</span></div>`;
                }
            });

            return html;
        }*/
        paging(link, index) {
            if ( (link.url === null && link.label != '...' && link.active === false && index === 0) ||
                (link.url != null && link.label != '...' && link.active === true) ||
                (link.url === null && link.label === '...') ||
                (link.url === null && index === this.$store.state.links.length - 1) ) {

                return;
            }
            let pageNumb;
            if (link.url != null) {
                pageNumb = Number(new URL(link.url).searchParams.get('page'));
            }
            this.$emit('paging', pageNumb);
        }
    }
}
</script>
