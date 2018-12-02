import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
import { imageHandler } from '../../utils/image-handler';
import { Professional } from '../../models/professional.model';

@Component({
    tag: 'professional-picker',
    styleUrl: 'professional-picker.css',
    shadow: false
})
export class ProfessionalPicker {

    @Prop({ mutable: true }) professionals: Professional[] = [];

    @State() selectedProfessionalId: string = null;
    @State() professionalsRefined: Array<{ professional: Professional, img: string }> = [];

    @Event() onProfessionalUpdated: EventEmitter;

    componentWillLoad(): void {
        if (!this.professionals.length) { return; }
    
        this.selectedProfessionalId = this.professionals[0].id;
        this.handlingProfessionalsImg();
    }

    private handlingProfessionalsImg(): void {
        this.professionalsRefined = [];

        this.professionals.map((professional) => {
            imageHandler(professional.picture)
                .then((img) => {
                    this.professionalsRefined = [...this.professionalsRefined, { professional, img }];
                });
        });
    }

    private setSelectedProfessional(professional: Professional): void {
        this.selectedProfessionalId = professional.id;
        this.onProfessionalUpdated.emit(professional);
    }

    private isSelectedProfessional(professionalId: string): boolean {
        if (!this.selectedProfessionalId) { return false; }

        return professionalId === this.selectedProfessionalId;
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.professionalsRefined.map(element =>
                    <figure
                        class="professional"
                        onClick={() => this.setSelectedProfessional(element.professional)}>
                        <img
                            class={{ 'selected': this.isSelectedProfessional(element.professional.id) }}
                            src={element.img} />
                        <figcaption>{element.professional.name}</figcaption>
                    </figure>
                )}
            </div>
        );
    }
}
