<template>
  <Layout>
    <main>
      <div class="map md:block hidden">
        <iframe
          src="https://snazzymaps.com/embed/149757"
          style="border:none;"
          width="100%"
          height="400px"
        ></iframe>
      </div>

      <div class="container">
        <div class="w-full md:w-2/3 mx-auto">
          <h2>How to find TMAC</h2>
          <div class="content">
            <div>
              <p>
                <a
                  href="https://policies.tomediaarts.org/procedure-manual/policies/accessibility"
                  >Accessibility information</a
                >
              </p>
              <h3 id="entrance">Entrance</h3>
              <p>
                The main entrance can be a bit tricky to find your first time
                here. It is
                <em>not directly off Lisgar</em>, but on the north side of the
                building facing the park. Our doors are east of the main condo
                entrance for 36 Lisgar.
              </p>
              <p>
                From Sudbury and Lisgar, head towards Queen Street until you are
                at the front of the condo building.
              </p>
              <p>
                <b>Lost?</b> Call or text (647) 689-6005 and someone will be
                happy to assist.
              </p>
              <h3 id="transit">Transit</h3>
              <p>
                <b>501 Queen streetcar</b>: Get off at <b>Abell Street</b>, just
                east of Gladstone. Head south through Lisgar Park.
              </p>
              <p>
                <b>504 King streetcar</b>: Get off at <b>Sudbury Street</b>, and
                walk north/west along Sudbury to Lisgar Street. Walk up Lisgar
                Street to the front of the building.
              </p>
              <h3>Parking</h3>
              <p>
                There is ample paid parking nearby, including a
                <a
                  href="https://parking.greenp.com/carpark/261_45-abell-street/"
                  >Green P lot</a
                >
                in the building, a lot accessible from the alley between
                Dovercourt and Lisgar off Sudbury, and street parking on both
                Lisgar Street and Abell Street.
              </p>
            </div>
            <div>
              <h3 id="address">Address</h3>
              <p>
                <a href="https://goo.gl/maps/5nSbi2UVBa82"
                  >32 Lisgar Street, Toronto, ON, M6J 0C9</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Location",
    keywords: "TMAC, toronto media arts centre, tmac address, 32 Lisgar",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1535151025-tmac-exterior-facebook.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "How to find us" },
      {
        name: "twitter:description",
        content:
          "How to find the Toronto Media Arts Centre – transit, parking and accessibility information."
      },
      { name: "og:title", content: "About TMAC" },
      {
        name: "og:description",
        content:
          "How to find the Toronto Media Arts Centre – transit, parking and accessibility information."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1535151025-tmac-exterior-facebook.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
