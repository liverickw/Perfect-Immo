export default function AdminStatisticsPage() {
  return (
    <div className="panel show" id="pg-stats">
      <div className="stat-row">
        <div className="stat-card"><div className="stat-label">Visites ce mois</div><div className="stat-value">—</div><div className="stat-delta up"><i className="ti ti-trending-up" aria-hidden="true" /> API analytics</div></div>
        <div className="stat-card"><div className="stat-label">Pages vues</div><div className="stat-value">—</div><div className="stat-delta up"><i className="ti ti-trending-up" aria-hidden="true" /> À synchroniser</div></div>
        <div className="stat-card"><div className="stat-label">Taux rebond</div><div className="stat-value">—</div><div className="stat-delta down"><i className="ti ti-trending-down" aria-hidden="true" /> Analytics requis</div></div>
        <div className="stat-card"><div className="stat-label">Durée moy. session</div><div className="stat-value">—</div><div className="stat-delta up"><i className="ti ti-trending-up" aria-hidden="true" /> Analytics requis</div></div>
      </div>
      <div className="grid-2">
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title">Pages les plus visitées</div></div>
          <table className="data-table" style={{ fontSize: 11 }}>
            <thead><tr><th>Page</th><th>Visites</th><th>Taux conversion</th></tr></thead>
            <tbody>
              <tr><td>/projets</td><td>—</td><td><span className="badge badge-gray">N/A</span></td></tr>
              <tr><td>/accueil</td><td>—</td><td><span className="badge badge-gray">N/A</span></td></tr>
              <tr><td>/realisations</td><td>—</td><td><span className="badge badge-gray">N/A</span></td></tr>
              <tr><td>/services</td><td>—</td><td><span className="badge badge-gray">N/A</span></td></tr>
              <tr><td>/contact</td><td>—</td><td><span className="badge badge-gray">N/A</span></td></tr>
            </tbody>
          </table>
        </div>
        <div className="chart-card">
          <div className="chart-header"><div className="chart-title">Sources de trafic</div></div>
          <div className="donut-wrap" style={{ justifyContent: "center", gap: "1.5rem", padding: "1rem 0" }}>
            <svg width="80" height="80" viewBox="0 0 80 80" aria-label="Camembert sources de trafic">
              <circle cx="40" cy="40" r="28" fill="none" stroke="#185FA5" strokeWidth="14" strokeDasharray="70.4 105.6" strokeDashoffset="0" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="#3B6D11" strokeWidth="14" strokeDasharray="44 132" strokeDashoffset="-70.4" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="#C9A84C" strokeWidth="14" strokeDasharray="28 148" strokeDashoffset="-114.4" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="#888780" strokeWidth="14" strokeDasharray="34 142" strokeDashoffset="-142.4" />
            </svg>
            <div className="donut-legend">
              <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: "#185FA5" }} />Google organique</div>
              <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: "#3B6D11" }} />Réseaux sociaux</div>
              <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: "#C9A84C" }} />Direct</div>
              <div className="donut-legend-item"><div className="donut-legend-dot" style={{ background: "#888780" }} />Autres</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
